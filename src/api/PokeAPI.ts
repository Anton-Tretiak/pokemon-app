import { PokemonsResponse } from '../types/PokemonsResponse';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const limitQuery = 'limit=12';

export const fetchData = async<T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    
    return await response.json();
  } catch {
    throw new Error('Error while fetching data');
  }
};

export const fetchPokemonAPI = async(): Promise<PokemonsResponse> => {
  const data = await fetchData<PokemonsResponse>(`${API_URL}?${limitQuery}`);
  
  return data;
};
