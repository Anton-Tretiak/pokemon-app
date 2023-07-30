import React, { FC, memo } from 'react';
import cn from 'classnames';

import { getTagColorClass } from '../../utils/GetTagColor';
import { PokemonDetails } from '../../types/PokemonDetails';

import './PokemonItem.scss';

type Props = {
  pokemon: PokemonDetails;
  isClicked: boolean;
  onPokemonClick: (pokemon: PokemonDetails) => void;
}

export const PokemonItem: FC<Props> = memo(({ pokemon, isClicked, onPokemonClick }) => {
  const handlePokemonClick = () => {
    onPokemonClick(pokemon);
  };
  
  return (
    <div
      className={cn('card', 'box', 'content', { 'card__clicked': isClicked })}
      onClick={handlePokemonClick}
    >
      {pokemon.sprites.front_default && (
        <img
          className='card__image'
          src={pokemon.sprites.front_default} alt="pokemon image"
        />
      )}
      
      <h4 className='card__name'>{pokemon.name}</h4>
      
      {pokemon.types.map(item => (
        <span
          key={item.type.name}
          className={cn('tag', getTagColorClass(item.type.name))}
        >
          {item.type.name}
        </span>
      ))}
    </div>
  );
});
