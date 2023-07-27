import { useState, useEffect } from 'react';
import './PokemonList.scss';
import { fetchPokemonAPI } from '../../API/PokeAPI';

import { PokemonsResponse } from '../../Types/PokemonsResponse';
import { PokemonDetails } from '../../Types/PokemonDetails';

import { PokemonItem } from '../PokemonItem/PokemonItem';
import { Loader } from '../Loader/Loader';

export const PokemonsList = () => {
  const [pokemonsData, setPokemonsData] = useState<PokemonsResponse | null>(
    null,
  );
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPokemonsData = async() => {
    try {
      const apiResponse = await fetchPokemonAPI();

      setPokemonsData(apiResponse);
    } catch {
      throw new Error('Error while fetching data');
    }
  };
  
  const fetchPokemonDetails = async(pokemonUrls: string[]) => {
    try {
      const promises = pokemonUrls.map(async(url: string) => {
        const response = await fetch(url);
        
        return response.json();
      });
      
      const pokemonDetailsArray = await Promise.all(promises);
      
      setPokemonDetails(pokemonDetailsArray);
    } catch {
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
    } catch {
      throw new Error('Error while fetching page');
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadNextPage = async() => {
    if (pokemonsData?.next) {
      fetchPage(pokemonsData.next);
    }
  };
  
  const loadPreviousPage = async() => {
    if (pokemonsData?.previous) {
      fetchPage(pokemonsData.previous);
    }
  };

  return (
    <div className='list-container'>
      <div className={`list box ${isLoading && 'loading-height'}`}>
        {isLoading ? (
          <Loader />
        ) : (
          pokemonDetails.length && (
            pokemonDetails.map((pokemon: PokemonDetails, index: number) => (
              <PokemonItem
                key={index}
                pokemon={pokemon}
              />
            ))
          )
        )}
        
        <div className='list__buttons'>
          <button
            className='button is-info list__button'
            onClick={loadPreviousPage}
            disabled={!pokemonsData?.previous}
          >
            Go Back
          </button>
          
          <button
            className='button is-info list__button'
            onClick={loadNextPage}
            disabled={!pokemonsData?.next}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
