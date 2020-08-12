import React, { useState } from 'react';
import { usePlayerStore } from '../player/player-store.js';

import Report from './Report.js'
import Map from './Map.js'
import Technologies from './Technologies.js'
import Politic from './Politic.js'
import Introduction from './Introduction/Introduction.js'


function GameText() {
  const { playerState, playerDispatch } = usePlayerStore();
  const [range, setRange] = useState(1);

  if(playerState.whichTab === 0){
    return (<Report />)
  } else if (playerState.whichTab === 1){
    return (<Map />)
  } else if (playerState.whichTab === 2){
    return (<Technologies />)
  } else if (playerState.whichTab === 3){
    return (<Politic />)
  } else if (playerState.whichTab === 4){
    return (<div><h1>Fin de cycle</h1><button onClick={() => playerDispatch({type: 'endTurn'})}>S'endormir</button></div>)
  } else if (playerState.whichTab === 5){ //rough code, for testing
    return (
      <div>
        <p>
          <button onClick={() => playerDispatch({ type: 'removePoints', range: range })}>Diminuer</button>
          Points de préoccupation actuels: { playerState.preoccupationPoints }
          <button onClick={() => playerDispatch({ type: 'addPoints', range: range })}>Augmenter</button>
        </p>
        <p>Valeur d'augmentation ou de diminution des PPs :
          <button onClick={() => setRange(range - 1)}>-</button>
          { range }
          <button onClick={() => setRange(range + 1)}>+</button>
        </p>
        <br />
        <button onClick={() => playerDispatch({ type: 'resetPoints' })}>Réinitialiser</button>
        <br /><br />
        <ul>
          <li>{ playerState.resourcesQuantity[0] } { playerState.resourcesName[0] } : <button onClick={() => playerDispatch({ type: 'increaseRes', index:0, range:1}) }>+</button><button onClick={() => playerDispatch({ type: 'decreaseRes', index:0, range:1}) }>-</button></li>
          <li>{ playerState.resourcesQuantity[1] } { playerState.resourcesName[1] } : <button onClick={() => playerDispatch({ type: 'increaseRes', index:1, range:1}) }>+</button><button onClick={() => playerDispatch({ type: 'decreaseRes', index:1, range:1}) }>-</button></li>
        </ul>
      </div>
    )
  } else { 
    return (<Introduction />)
  }

}

export default GameText;
