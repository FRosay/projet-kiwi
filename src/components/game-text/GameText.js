import React, { useState } from 'react';
import { usePlayerStore } from '../player/player-store.js';


function GameText() {

  const { state, dispatch } = usePlayerStore();
  const [range, setRange] = useState(1);

    return (
      <div id="game-text-div">
        <p>
          <button onClick={() => dispatch({ type: 'decrement', range: range })}>Diminuer</button>
          Points de préoccupation actuels: { state.preoccupationPoints }
          <button onClick={() => dispatch({ type: 'increment', range: range })}>Augmenter</button>
        </p>
        <p>
          Valeur d'augmentation ou de diminution des PPs :  
          <button onClick={() => setRange(range - 1)}>-</button> 
          { range }
          <button onClick={() => setRange(range + 1)}>+</button>
        </p>
        <br /><br />
        <button onClick={() => dispatch({ type: 'reset' })}>Réinitialiser</button>
      </div>
    )
}

export default GameText;
