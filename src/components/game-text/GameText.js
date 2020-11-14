import React from 'react';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';

import Report from './Report.js'
import Map from './Map.js'
import Technologies from './Technology/Technologies.js'
import Politic from './Politic.js'
import Options from './Options.js'
import Introduction from './Introduction/Introduction.js'
import Testing from './../Testing.js'


function GameText() {
  const { gameTurnState, gameTurnDispatch } = useGameTurnStore();

  if (gameTurnState.whichTab === 0) {
    return (<Report />)

  } else if (gameTurnState.whichTab === 1) {
    return (<Map />)

  } else if (gameTurnState.whichTab === 2) {
    return (<Technologies />)

  } else if (gameTurnState.whichTab === 3) {
    return (<Politic />)

  } else if (gameTurnState.whichTab === 4) {
    return (<div><p>{gameTurnState.preoccupationPoints > 0 ? ' /!\\ Il te reste encore des PP /!\\' : 'Passer au cycle suivant...'}</p>
    <button onClick={() => {
    gameTurnDispatch({ category:'endTurn' });
    }}>S'endormir</button></div>)

  } else if (gameTurnState.whichTab === 5) { //rough code, for testing
    return (<Testing />)

  } else if (gameTurnState.whichTab === 9) {
    return (<Options />)

  } else {
    return (<Introduction />)
  }
}

export default GameText;
