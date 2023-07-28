import React from 'react';
import './PokemonStats.scss';

import { PokemonDetails } from '../../Types/PokemonDetails';

type Props = {
  selectedPokemon: PokemonDetails | null;
};

export const PokemonStats: React.FC<Props> = ({ selectedPokemon }) => {
  return (
    <div className='stats__wrapper'>
      <div className='stats__card box content'>
        <img src={selectedPokemon?.sprites.front_default ?? ''} alt=""/>
        
        <h4 className='stats__name'>{selectedPokemon?.name}</h4>
        
        {selectedPokemon ? (
          <table className='table is-bordered'>
            <tbody>
            <tr>
              <th className='table__first-column'>Type</th>
              <td className='stats__type table__second-column'>
                <b>
                  {selectedPokemon?.types[0].type.name}
                </b>
              </td>
            </tr>
            
            <tr>
              <th>Attack</th>
              <th>{selectedPokemon?.stats[1].base_stat}</th>
            </tr>
            
            <tr>
              <th>Defence</th>
              <th>{selectedPokemon?.stats[2].base_stat}</th>
            </tr>
            
            <tr>
              <th>HP</th>
              <th>{selectedPokemon?.stats[0].base_stat}</th>
            </tr>
            
            <tr>
              <th>SP Attack</th>
              <th>{selectedPokemon?.stats[3].base_stat}</th>
            </tr>
            
            <tr>
              <th>SP Defence</th>
              <th>{selectedPokemon?.stats[4].base_stat}</th>
            </tr>
            
            <tr>
              <th>Speed</th>
              <th>{selectedPokemon?.stats[5].base_stat}</th>
            </tr>
            
            <tr>
              <th>Weight</th>
              <th>{selectedPokemon?.weight}</th>
            </tr>
            
            <tr>
              <th>Total Moves</th>
              <th>{selectedPokemon?.moves.length}</th>
            </tr>
            </tbody>
          </table>
        ) : (
          <h4>Choose a Pokemon</h4>
        )}
      </div>
    </div>
  );
};