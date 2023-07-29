import React from 'react';
import './App.scss';

import { Header } from './Components/Header/Header';
import { PokemonsList } from './Components/PokemonList/PokemonsList';
import { PokemonStats } from './Components/PokemonStats/PokemonStats';

import { usePokemonData } from './Hooks/usePokemonData';

function App() {
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
}

export default App;
