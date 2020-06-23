import React, { useState } from 'react';
import { usePlayerStore } from '../player/player-store.js';

import Report from './Report.js'
import Map from './Map.js'
import Technologies from './Technologies.js'
import Politic from './Politic.js'


function GameText() {
  const { state, dispatch } = usePlayerStore();
  const [range, setRange] = useState(1);

  if(state.whichTab === 0){
    return (<div id='game-text-div'><Report /></div>)
  } else if (state.whichTab === 1){
    return (<div id='game-text-div'><Map /></div>)
  } else if (state.whichTab === 2){
    return (<div id='game-text-div'><Technologies /></div>)
  } else if (state.whichTab === 3){
    return (<div id='game-text-div'><Politic /></div>)
  } else if (state.whichTab === 4){//cheat
    return (
      <div id='game-text-div'>
        <h1>Triche</h1>
          <ul>
            <li>{ state.preoccupationPoints } PP : <button onClick={() => dispatch({ type: 'addPoints', range:1}) }>+</button><button onClick={() => dispatch({ type: 'removePoints', range:1}) }>-</button></li>
            <li>{ state.resourcesQuantity[0] } { state.resourcesName[0] } : <button onClick={() => dispatch({ type: 'increaseRes', index:0, range:1}) }>+</button><button onClick={() => dispatch({ type: 'decreaseRes', index:0, range:1}) }>-</button></li>
            <li>{ state.resourcesQuantity[1] } { state.resourcesName[1] } : <button onClick={() => dispatch({ type: 'increaseRes', index:1, range:1}) }>+</button><button onClick={() => dispatch({ type: 'decreaseRes', index:1, range:1}) }>-</button></li>
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
