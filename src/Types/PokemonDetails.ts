import { PokemonTypes } from './PokemonTypes';
import { PokemonSprites } from './PokemonSprites';

export interface PokemonDetails {
  name: string;
  weight: number;
  types: PokemonTypes[];
  sprites: PokemonSprites;
}
