import React from 'react';
import { useOptionsStore } from '../options/options-store.js';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';
//import GetImage from '../GraphicResources.js'


function OwnPopulation() {

  const { stateOfOptions } = useOptionsStore();
  const { gameTurnState } = useGameTurnStore();

  if(stateOfOptions.display !== 'full'){
    return (
      <div id='own-population-div'>
        ESPÈCE : {gameTurnState.ownSpecies},<br/>pop: {gameTurnState.populationQuantity},<br/>happiness: {gameTurnState.happiness},<br/>caract : ...
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default OwnPopulation;
