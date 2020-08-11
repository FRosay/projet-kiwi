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
    return (<Report />)
  } else if (state.whichTab === 1){
    return (<Map />)
  } else if (state.whichTab === 2){
    return (<Technologies />)
  } else if (state.whichTab === 3){
    return (<Politic />)
  } else if (state.whichTab === 4){
    return (<div><h1>Fin de cycle</h1><button onClick={() => dispatch({type: 'endTurn'})}>S'endormir</button></div>)
  } else if (state.whichTab === 5){ //rough code, for testing
    return (
      <div>
        <p>
          <button onClick={() => dispatch({ type: 'removePoints', range: range })}>Diminuer</button>
          Points de préoccupation actuels: { state.preoccupationPoints }
          <button onClick={() => dispatch({ type: 'addPoints', range: range })}>Augmenter</button>
        </p>
        <p>Valeur d'augmentation ou de diminution des PPs :
          <button onClick={() => setRange(range - 1)}>-</button>
          { range }
          <button onClick={() => setRange(range + 1)}>+</button>
        </p>
        <br />
        <button onClick={() => dispatch({ type: 'resetPoints' })}>Réinitialiser</button>
        <br /><br />
        <ul>
          <li>{ state.resourcesQuantity[0] } { state.resourcesName[0] } : <button onClick={() => dispatch({ type: 'increaseRes', index:0, range:1}) }>+</button><button onClick={() => dispatch({ type: 'decreaseRes', index:0, range:1}) }>-</button></li>
          <li>{ state.resourcesQuantity[1] } { state.resourcesName[1] } : <button onClick={() => dispatch({ type: 'increaseRes', index:1, range:1}) }>+</button><button onClick={() => dispatch({ type: 'decreaseRes', index:1, range:1}) }>-</button></li>
        </ul>
      </div>
    )
  }

}

export default GameText;
