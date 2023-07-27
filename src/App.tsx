import React from 'react';
import './App.css';

import { Header } from './Components/Header/Header';
import { PokemonsList } from './Components/PokemonList/PokemonsList';

function App() {
  return (
    <div className="App">
      <Header />
      
      <PokemonsList />
    </div>
  );
}

export default App;
