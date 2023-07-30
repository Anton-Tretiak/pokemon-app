import { useEffect, useState } from 'react';
import { fetchPokemonAPI, fetchData } from '../api/PokeAPI';
import { PokemonsResponse } from '../types/PokemonsResponse';
import { PokemonDetails } from '../types/PokemonDetails';

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
    }
  };
  
  const fetchPokemonDetails = async(pokemonUrls: string[]) => {
    try {
      setPokemonDetails([]);
      
      const pokemonDetailsArray: PokemonDetails[] = [];
      
      for (let i = 0; i < pokemonUrls.length; i++) {
        pokemonDetailsArray.push(await fetchData<PokemonDetails>(pokemonUrls[i]));
      }

      setPokemonDetails(pokemonDetailsArray);
    } catch (error) {
      throw new Error('Error while fetching pokemon details');
    } finally {
      setIsLoading(false);
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
      
      const data = await fetchData<PokemonsResponse>(url);

      setPokemonsData(data);

      const pokemonUrls = data.results.map((pokemon) => pokemon.url);

      fetchPokemonDetails(pokemonUrls);
    } catch (error) {
      throw new Error('Error while fetching page');
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
