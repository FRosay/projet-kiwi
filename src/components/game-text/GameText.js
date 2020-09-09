import React from 'react';
import { usePlayerStore } from '../player/player-store.js';

import Report from './Report.js'
import Map from './Map.js'
import Technologies from './Technology/Technologies.js'
import Politic from './Politic.js'
import Introduction from './Introduction/Introduction.js'
import Testing from './../Testing.js'


function GameText() {
  const { playerState, playerDispatch } = usePlayerStore();

  if (playerState.whichTab === 0) {
    return (<Report />)

  } else if (playerState.whichTab === 1) {
    return (<Map />)

  } else if (playerState.whichTab === 2) {
    return (<Technologies />)

  } else if (playerState.whichTab === 3) {
    return (<Politic />)

  } else if (playerState.whichTab === 4) {
    return (<div><h1>Fin de cycle</h1><p>{playerState.preoccupationPoints > 0 ? ' /!\\ Il te reste encore des PP /!\\' : 'Passer au cycle suivant...'}</p><button onClick={() => playerDispatch({type: 'endTurn'})}>S'endormir</button></div>)

  } else if (playerState.whichTab === 5) { //rough code, for testing
    return (<Testing />)

  } else {
    return (<Introduction />)
  }
}

export default GameText;
