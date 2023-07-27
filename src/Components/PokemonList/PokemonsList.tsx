import { useState, useEffect } from 'react';
import './PokemonList.scss';
import { fetchPokemonAPI } from '../../API/PokeAPI';

import { PokemonsResponse } from '../../Types/PokemonsResponse';
import { Pokemon } from '../../Types/Pokemon';
import { PokemonDetails } from '../../Types/PokemonDetails';

import { PokemonItem } from '../PokemonItem/PokemonItem';

export const PokemonsList = () => {
  const [pokemonsData, setPokemonsData] = useState<PokemonsResponse | null>(
    null,
  );
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);

  const getPokemonsData = async() => {
    try {
      const apiResponse = await fetchPokemonAPI();

      setPokemonsData(apiResponse);
    } catch {
      throw new Error('Error while fetching data');
    }
  };

  useEffect(() => {
    getPokemonsData();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async() => {
      if (pokemonsData) {
        const promises = pokemonsData.results.map(async(pokemon: Pokemon) => {
          const response = await fetch(pokemon.url);

          return response.json();
        });

        const pokemonDetailsArray = await Promise.all(promises);

        setPokemonDetails(pokemonDetailsArray);
      }
    };

    fetchPokemonDetails();
  }, [pokemonsData]);

  return (
    <div className='list-container'>
      <div className='list box'>
        {pokemonDetails.length && (
          pokemonDetails.map((pokemon: PokemonDetails, index: number) => (
            <PokemonItem
              key={index}
              pokemon={pokemon}
            />
          ))
        )}
        
        <div className='list__buttons'>
          <button className='button is-info list__button'>
            Go Back
          </button>
          
          <button className='button is-info list__button'>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
