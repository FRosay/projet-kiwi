import React from 'react';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';

function Report() {
  const { gameTurnState } = useGameTurnStore();
  return(
      <div>
      <h1>Rapport</h1>
      <p>-- Cycle {gameTurnState.turnNumber} --</p>
      <p>{gameTurnState.turnNumber === 0 ? 'TODO paragraphe de crash' : 'TODO'}</p>
      </div>
  )
}

export default Report;
