import { PokemonsResponse } from '../Types/PokemonsResponse';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const limitQuery = 'limit=12';

export const fetchPokemonAPI = async(): Promise<PokemonsResponse> => {
  try {
    const response = await fetch(`${API_URL}?${limitQuery}`);

    return await response.json();
  } catch {
    throw new Error('Error while fetching data');
  }
};
