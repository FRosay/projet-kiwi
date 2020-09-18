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
    console.log('f(isCrossing) gameTurnState.cross : '+gameTurnState.cross)
    return isIt;
  }

  function specificMapButton(){
    if (gameTurnState.isObstacle[gameTurnState.clicked] && gameTurnState.owner[gameTurnState.clicked][0] === 'noOne') {
      return(
        <button
        disabled={ gameTurnState.preoccupationPoints > 0 && !isCrossing(gameTurnState.clicked) ? false : true }
        onClick={() => {
        gameTurnDispatch({ category:'regions', type:'cross' });
        }}
        ><span role="img" aria-label="crossing">🚸</span> Franchir [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
      )
    } else if (!gameTurnState.isObstacle[gameTurnState.clicked] && gameTurnState.zoneTypes[gameTurnState.clicked].length < gameTurnState.zoneMax[gameTurnState.clicked]) {
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

  function displayMapZones(){
    let zones = ''
    for(let i = 0; i < gameTurnState.zoneTypes[gameTurnState.clicked].length; i++){
      zones += gameTurnState.zoneTypes[gameTurnState.clicked][i]
      if(i+1 < gameTurnState.zoneTypes[gameTurnState.clicked].length){
        zones +=', '
      }
    }
    return(zones)
  }

  function insideMap(){
    return(
      <div>
        <h1>{ gameTurnState.name[gameTurnState.clicked].charAt(0).toUpperCase() + gameTurnState.name[gameTurnState.clicked].slice(1) }</h1>
        <p><img alt='img of region discovered'
        src={GetImage(gameTurnState.type[gameTurnState.clicked])}
        /></p>
        <p>(coordonnées : { gameTurnState.coordinatesX[gameTurnState.clicked] };{ gameTurnState.coordinatesY[gameTurnState.clicked] })<br/>
        (nb zones max : { gameTurnState.zoneMax[gameTurnState.clicked] })<br/>
        (owner : { gameTurnState.owner[gameTurnState.clicked] })<br/>
        Zones :<br/>{ displayMapZones() }</p>
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
