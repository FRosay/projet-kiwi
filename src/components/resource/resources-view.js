import React from 'react';
import SingleResource from './single-resource.js'
import { useOptionsStore } from '../options/options-store.js';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';


function ResourcesView() {

  const { stateOfOptions } = useOptionsStore();
  const { gameTurnState, gameTurnDispatch } = useGameTurnStore();

  let res = []
  for(let i = 0; i < gameTurnState.resourcesName.length; i++){
    res.push(
      <SingleResource key= { i } name= { gameTurnState.resourcesName[i] } type= { gameTurnState.resourcesCategory[i] } quantity= { gameTurnState.resourcesQuantity[i] } isUnique= { gameTurnState.resourcesIsUnique[i] } shortVersion= { true } gameTurnDispatch= { gameTurnDispatch } />
    )
  }

  if(stateOfOptions.display !== 'full'){
    return (
        <div id='resources-view-div'>
          {res}
        </div>
    )
  } else {
    return null
  }
}

export default ResourcesView
