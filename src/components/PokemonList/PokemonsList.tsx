import React, { useCallback, FC } from 'react';
import cn from 'classnames';

import { PokemonsResponse } from '../../types/PokemonsResponse';
import { PokemonDetails } from '../../types/PokemonDetails';

import { PokemonItem } from '../PokemonItem';
import { Loader } from '../Loader';

import './PokemonList.scss';

type Props = {
  pokemonsData: PokemonsResponse | null;
  pokemonDetails: PokemonDetails[];
  isLoading: boolean;
  onLoadNextPage: () => void;
  onLoadPreviousPage: () => void;
  selectedPokemon: PokemonDetails | null;
  onPokemonClick: (pokemon: PokemonDetails) => void;
};

export const PokemonsList: FC<Props> = ({
  pokemonsData,
  pokemonDetails,
  isLoading,
  onLoadNextPage,
  onLoadPreviousPage,
  selectedPokemon,
  onPokemonClick,
}) => {
  const handlePokemonClick = useCallback((pokemon: PokemonDetails) => {
    onPokemonClick(pokemon);
  }, [onPokemonClick]);
  
  return (
    <div className='list-container'>
      <div className={cn('list', 'box', { 'loading-height': isLoading })}>
        {isLoading ? (
          <Loader />
        ) : (
          pokemonDetails.length > 0 && (
            pokemonDetails.map((pokemon: PokemonDetails) => (
              <PokemonItem
                key={pokemon.id}
                pokemon={pokemon}
                isClicked={pokemon === selectedPokemon}
                onPokemonClick={handlePokemonClick}
              />
            ))
          ))}
        
        <div className='list__buttons'>
          <button
            className='button is-info list__button'
            onClick={onLoadPreviousPage}
            disabled={!pokemonsData?.previous}
          >
            Go Back
          </button>
          
          <button
            className='button is-info list__button'
            onClick={onLoadNextPage}
            disabled={!pokemonsData?.next}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
