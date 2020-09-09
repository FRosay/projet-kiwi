import React from 'react';
import { usePlayerStore } from '../player/player-store.js';

function Report() {
  const { playerState } = usePlayerStore();
  return(
      <div>
      <h1>Rapport</h1>
      <p>-- Cycle {playerState.turnNumber} --</p>
      <p>{playerState.turnNumber === 0 ? 'TODO paragraphe de crash' : 'TODO'}</p>
      </div>
  )
}

export default Report;
