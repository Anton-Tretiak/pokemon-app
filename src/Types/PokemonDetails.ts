import { PokemonTypes } from './PokemonTypes';
import { PokemonSprites } from './PokemonSprites';
import { PokemonStats } from './PokemonStats';
import { PokemonMoves } from './PokemonMoves';

export interface PokemonDetails {
  name: string;
  weight: number;
  types: PokemonTypes[];
  sprites: PokemonSprites;
  stats: PokemonStats[];
  moves: PokemonMoves[];
}
