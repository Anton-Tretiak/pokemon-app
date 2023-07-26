import React from 'react';
import { PokemonDetails } from '../../Types/PokemonDetails';

type Props = {
  pokemon: PokemonDetails;
  index: number;
}

export const PokemonItem: React.FC<Props> = ({ pokemon, index }) => {
  return (
    <>
      <li key={index}>
        {pokemon.name} - {pokemon.weight} - {pokemon.types.map(item => (
          <span>{item.type.name} </span>
        ))}
      </li>
      
      <div>
        {pokemon.sprites.front_default && (
          <img src={pokemon.sprites.front_default} alt="" />
        )}
      </div>
    </>
  );
};
