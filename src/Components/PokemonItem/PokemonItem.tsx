import React from 'react';
import './PokemonItem.scss';

import { getTagColorClass } from '../../Utils/GetTagColor';
import { PokemonDetails } from '../../Types/PokemonDetails';

type Props = {
  pokemon: PokemonDetails;
  isClicked: boolean;
  onPokemonClick: (pokemon: PokemonDetails) => void;
}

export const PokemonItem: React.FC<Props> = ({ pokemon, isClicked, onPokemonClick }) => {
  return (
    <div
      className={`card box content ${isClicked ? 'card__clicked' : ''}`}
      onClick={() => onPokemonClick(pokemon)}
    >
      {pokemon.sprites.front_default && (
        <img
          className='card__image'
          src={pokemon.sprites.front_default} alt=""
        />
      )}
      
      <h4 className='card__name'>{pokemon.name}</h4>
      
      {pokemon.types.map(item => (
        <span
          key={item.type.name}
          className={`tag ${getTagColorClass(item.type.name)}`}
        >
          {item.type.name}
        </span>
      ))}
    </div>
  );
};
