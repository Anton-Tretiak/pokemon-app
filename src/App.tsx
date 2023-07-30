import React from 'react';
import { usePokemonData } from './hooks/usePokemonData';

import { Header, PokemonsList, PokemonStats } from './components';

import './App.scss';

export const App = () => {
  const {
    pokemonsData,
    pokemonDetails,
    isLoading,
    selectedPokemon,
    handlePokemonClick,
    loadNextPage,
    loadPreviousPage,
  } = usePokemonData();
  
  return (
    <div className="App">
      <Header />
      
      <section className='App__content'>
        <PokemonsList
          pokemonsData={pokemonsData}
          pokemonDetails={pokemonDetails}
          isLoading={isLoading}
          onLoadNextPage={loadNextPage}
          onLoadPreviousPage={loadPreviousPage}
          selectedPokemon={selectedPokemon}
          onPokemonClick={handlePokemonClick}
        />
        
        <PokemonStats selectedPokemon={selectedPokemon} />
      </section>
    </div>
  );
};
