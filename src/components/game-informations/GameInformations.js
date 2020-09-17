import React from 'react';
import { useOptionsStore } from '../options/options-store.js';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';
import GetImage from '../GraphicResources.js'


function GameInformations() {
  const { stateOfOptions } = useOptionsStore();
  const { gameTurnState, gameTurnDispatch } = useGameTurnStore();

  function isCrossing(arrayPosition){
    let i = 0;
    let isIt = false;
    while(i < gameTurnState.cross.length && isIt === false){
      if(gameTurnState.cross[i] === arrayPosition){
        isIt = true;
      }
      i++;
    }
    console.log('gameTurnState.cross : '+gameTurnState.cross)
    return isIt;
  }

  function specificMapButton(){
    if(gameTurnState.isObstacle[gameTurnState.clicked]){
      return(
        <button
        disabled={ gameTurnState.preoccupationPoints > 0 && !isCrossing(gameTurnState.clicked) ? false : true }
        onClick={() => {
        gameTurnDispatch({ category:'regions', type:'cross' });
        }}
        ><span role="img" aria-label="crossing">🚸</span> Franchir [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
      )
    } else {
      return(
        <button
        disabled={ gameTurnState.preoccupationPoints > 0 ? false : true }
        onClick={() => {
        gameTurnDispatch({ category:'regions', type:'explore' });
        }}
        ><span role="img" aria-label="compass">🧭</span> Explorer [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
      )
    }
  }

  function insideMap(){
    return(
      <div>
        <h1>{ gameTurnState.name[gameTurnState.clicked].charAt(0).toUpperCase() + gameTurnState.name[gameTurnState.clicked].slice(1) }</h1>
        <p><img alt='img of region discovered'
        src={GetImage(gameTurnState.type[gameTurnState.clicked])}
        /></p>
        <p>Coordonnées : { gameTurnState.coordinatesX[gameTurnState.clicked] };{ gameTurnState.coordinatesY[gameTurnState.clicked] }<br/>
        NB Zone Max : { gameTurnState.zoneMax[gameTurnState.clicked] }<br/>
        Zones : { gameTurnState.zoneTypes[gameTurnState.clicked] }</p>
        { specificMapButton() }
      </div>
    )
  }

  if(stateOfOptions.display !== 'full'){
    return(
      <div id='game-informations-div'>{ gameTurnState.clicked !== false && gameTurnState.whichTab === 1 ? insideMap() : '' }</div>
    )
  } else {
    return(<div></div>)
  }
}

export default GameInformations;
