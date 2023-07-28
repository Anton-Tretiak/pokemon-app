import React, { useEffect, useState } from 'react';
import './App.scss';
import { fetchPokemonAPI } from './API/PokeAPI';

import { PokemonsResponse } from './Types/PokemonsResponse';
import { PokemonDetails } from './Types/PokemonDetails';

import { Header } from './Components/Header/Header';
import { PokemonsList } from './Components/PokemonList/PokemonsList';
import { PokemonStats } from './Components/PokemonStats/PokemonStats';

function App() {
  const [pokemonsData, setPokemonsData] = useState<PokemonsResponse | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const getPokemonsData = async() => {
    try {
      setIsLoading(true);
      
      const apiResponse = await fetchPokemonAPI();
      
      setPokemonsData(apiResponse);
    } catch {
      throw new Error('Error while fetching data');
    }
  };
  
  const fetchPokemonDetails = async(pokemonUrls: string[]) => {
    try {
      setPokemonDetails([]);
      
      const promises = pokemonUrls.map(async(url: string) => {
        const response = await fetch(url);
        
        return response.json();
      });
      
      const pokemonDetailsArray = await Promise.all(promises);
      
      setPokemonDetails(pokemonDetailsArray);
    } catch {
      throw new Error('Error while fetching pokemon details');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getPokemonsData();
  }, []);
  
  useEffect(() => {
    if (pokemonsData) {
      const pokemonUrls = pokemonsData.results.map((pokemon) => pokemon.url);
      
      fetchPokemonDetails(pokemonUrls);
    }
  }, [pokemonsData]);
  
  const fetchPage = async(url: string) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(url);
      const data: PokemonsResponse = await response.json();
      
      setPokemonsData(data);
      
      const pokemonUrls = data.results.map((pokemon) => pokemon.url);
      
      fetchPokemonDetails(pokemonUrls);
    } catch {
      throw new Error('Error while fetching page');
    }
  };
  
  const loadNextPage = async() => {
    if (pokemonsData?.next) {
      fetchPage(pokemonsData.next);
    }
  };
  
  const loadPreviousPage = async() => {
    if (pokemonsData?.previous) {
      fetchPage(pokemonsData.previous);
    }
  };
  
  const handlePokemonClick = (pokemon: PokemonDetails) => {
    setSelectedPokemon(pokemon);
  };
  
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
