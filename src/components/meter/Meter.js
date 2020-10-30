import React from 'react';
import { useOptionsStore } from '../options/options-store.js';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';
import GetImage from '../GraphicResources.js'


function Meter() {

  const { stateOfOptions } = useOptionsStore();
  const { gameTurnState } = useGameTurnStore();

  if(stateOfOptions.display !== 'full'){
    return (
      <div id='meter-div'>
      <div>-- Cycle {gameTurnState.turnNumber} --</div>
      <div>{gameTurnState.preoccupationPoints}/{gameTurnState.preoccupationPointsMax} <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/></div>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default Meter;
