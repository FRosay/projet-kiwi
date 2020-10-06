import React from 'react';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';

function Report() {
  const { gameTurnState } = useGameTurnStore();
  function displayReport(){
    let allLines = []
    for(let i = 0; i < gameTurnState.report.length; i++){
      allLines.push(<span key={i}>{gameTurnState.report[i]}<br/></span>)
    }
    return allLines
  }
  return(
      <div>
      <h1>Rapport</h1>
      <p>-- Cycle {gameTurnState.turnNumber} --</p>
      <p>{gameTurnState.turnNumber === 0 ? 'TODO paragraphe de crash' : displayReport()}</p>
      </div>
  )
}

export default Report;
