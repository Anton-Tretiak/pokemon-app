import React from 'react';
import './PokemonList.scss';

import { PokemonsResponse } from '../../Types/PokemonsResponse';
import { PokemonDetails } from '../../Types/PokemonDetails';

import { PokemonItem } from '../PokemonItem/PokemonItem';
import { Loader } from '../Loader/Loader';

type Props = {
  pokemonsData: PokemonsResponse | null;
  pokemonDetails: PokemonDetails[];
  isLoading: boolean;
  onLoadNextPage: () => void;
  onLoadPreviousPage: () => void;
  selectedPokemon: PokemonDetails | null;
  onPokemonClick: (pokemon: PokemonDetails) => void;
};

export const PokemonsList: React.FC<Props> = React.memo(({
  pokemonsData,
  pokemonDetails,
  isLoading,
  onLoadNextPage,
  onLoadPreviousPage,
  selectedPokemon,
  onPokemonClick,
}) => {
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
                isClicked={pokemon === selectedPokemon}
                onPokemonClick={onPokemonClick}
              />
            ))
          )
        )}
        
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
});
