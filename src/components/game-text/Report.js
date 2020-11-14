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
      <div id='report-div'>
      <h1>-- Cycle {gameTurnState.turnNumber} --</h1>
      <p>{gameTurnState.turnNumber === 0 ? 'TODO paragraphe de crash' : displayReport()}</p>
      </div>
  )
}

export default Report;
