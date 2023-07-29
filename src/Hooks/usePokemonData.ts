import { useEffect, useState } from 'react';
import { fetchPokemonAPI } from '../API/PokeAPI';
import { PokemonsResponse } from '../Types/PokemonsResponse';
import { PokemonDetails } from '../Types/PokemonDetails';

export function usePokemonData() {
  const [pokemonsData, setPokemonsData] = useState<PokemonsResponse | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const getPokemonsData = async() => {
    try {
      setIsLoading(true);

      const apiResponse = await fetchPokemonAPI();

      setPokemonsData(apiResponse);
    } catch (error) {
      throw new Error('Error while fetching data');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchPokemonDetails = async(pokemonUrls: string[]) => {
    try {
      setPokemonDetails([]);

      const promises = pokemonUrls.map(async(url: string) => {
        const response = await fetch(url);

        return response.json();
      });
      const pokemonDetailsArray = await Promise.all(promises);

      setPokemonDetails(pokemonDetailsArray);
    } catch (error) {
      throw new Error('Error while fetching pokemon details');
    }
  };
  
  useEffect(() => {
    getPokemonsData();
  }, []);
  
  useEffect(() => {
    if (pokemonsData) {
      const pokemonUrls = pokemonsData.results.map((pokemon) => pokemon.url);

      fetchPokemonDetails(pokemonUrls);
    }
  }, [pokemonsData]);
  
  const fetchPage = async(url: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      const data: PokemonsResponse = await response.json();

      setPokemonsData(data);

      const pokemonUrls = data.results.map((pokemon) => pokemon.url);

      fetchPokemonDetails(pokemonUrls);
    } catch (error) {
      throw new Error('Error while fetching page');
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadNextPage = () => {
    if (pokemonsData?.next) {
      fetchPage(pokemonsData.next);
    }
  };
  
  const loadPreviousPage = () => {
    if (pokemonsData?.previous) {
      fetchPage(pokemonsData.previous);
    }
  };
  
  const handlePokemonClick = (pokemon: PokemonDetails) => {
    setSelectedPokemon(pokemon);
  };
  
  return {
    pokemonsData,
    pokemonDetails,
    isLoading,
    selectedPokemon,
    loadNextPage,
    loadPreviousPage,
    handlePokemonClick,
  };
}
