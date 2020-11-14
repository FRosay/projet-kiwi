import React from 'react';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';

function Politic() {
  const { gameTurnState } = useGameTurnStore();

  function tableOfKnownSpecies(){
    let toks = []
    for(let i = 0; i < gameTurnState.relationsSpecies.length; i++){
      toks.push(
        <table style={{border:'2px solid white'}} key={i}><tbody>
          <tr><td>Nom:</td><td>{gameTurnState.relationsName[i]}</td></tr>
          <tr><td>Espèce:</td><td>{gameTurnState.relationsSpecies[i]}</td></tr>
          <tr><td>Sympathie:</td><td>{gameTurnState.relationsLiking[i]}</td></tr>
        </tbody></table>
      )
    }
    return toks
  }

  return(
      <div>{tableOfKnownSpecies()}</div>
  )
}

export default Politic;
