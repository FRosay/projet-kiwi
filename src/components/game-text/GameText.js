import React from 'react';
import { usePlayerStore } from '../player/player-store.js';


function GameText() {

  const { state, dispatch } = usePlayerStore();

    return (
      <div id="game-text-div">
        <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>

        <p>Points de préoccupation : { state.preoccupationPoints }</p>
        
        <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <br />
        <button onClick={() => dispatch({ type: 'reset' })}>Réinitialiser</button>
      </div>
    )
}

export default GameText;
