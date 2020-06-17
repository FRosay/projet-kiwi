import React, { useState } from 'react';
import { usePlayerStore } from '../player/player-store.js';


function GameText() {

  const { state, dispatch } = usePlayerStore();
  const [range, setRange] = useState(1);

  if(state.witchTab === 0){//report
    return (
      <div id='game-text-div'>
        <p>Rapport</p>
      </div>
    )
  } else if (state.witchTab === 1){//exploration
    return (
      <div id='game-text-div'>
        <p>Exploration</p>
      </div>
    )
  } else if (state.witchTab === 2){//diplomacy
    return (
      <div id='game-text-div'>
        <p>Diplomatie</p>
      </div>
    )
  } else if (state.witchTab === 3){//technology
    return (
      <div id='game-text-div'>
        <p>Technlogie</p>
      </div>
    )
  } else if (state.witchTab === 4){//politic
    return (
      <div id='game-text-div'>
        <p>Politique</p>
      </div>
    )
  } else if (state.witchTab === 5){//cheat
    return (
      <div id='game-text-div'>
        <h1>Triche</h1>
          <ul>
            <li>{ state.resources[0].quantity } Bois : <button onClick={() => dispatch({ resource:'bois', type: 'increment', range:1}) }>+</button><button onClick={() => dispatch({ resource:'bois', type: 'decrement', range:1}) }>-</button></li>
            <li>{ state.resources[1].quantity } Pierre : <button onClick={() => dispatch({ resource:'pierre', type: 'increment', range:1}) }>+</button><button onClick={() => dispatch({ resource:'pierre', type: 'decrement', range:1}) }>-</button></li>
          </ul>
      </div>
    )
  } else {//rought code, for testing
    return (
      <div id='game-text-div'>
        <p>
          <button onClick={() => dispatch({ type: 'removePoints', range: range })}>Diminuer</button>
          Points de préoccupation actuels: { state.preoccupationPoints }
          <button onClick={() => dispatch({ type: 'addPoints', range: range })}>Augmenter</button>
        </p>
        <p>
          Valeur d'augmentation ou de diminution des PPs :
          <button onClick={() => setRange(range - 1)}>-</button>
          { range }
          <button onClick={() => setRange(range + 1)}>+</button>
        </p>
        <br /><br />
        <button onClick={() => dispatch({ type: 'resetPoints' })}>Réinitialiser</button>
      </div>
    )
  }

}

export default GameText;
