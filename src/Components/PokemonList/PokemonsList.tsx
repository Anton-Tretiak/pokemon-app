import { useState, useEffect } from 'react';
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
    <div>
      <ul>
        {pokemonDetails.length && (
          pokemonDetails.map((pokemon: PokemonDetails, index: number) => (
            <PokemonItem
              pokemon={pokemon}
              index={index}
            />
          ))
        )}
      </ul>
    </div>
  );
};
