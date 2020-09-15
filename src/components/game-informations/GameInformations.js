import React from 'react';
import { useOptionsStore } from '../options/options-store.js';
import { usePlayerStore } from '../player/player-store.js';
import { useRegionsStore } from '../regions/regions-store.js';
import GetImage from '../GraphicResources.js'


function GameInformations() {
  const { stateOfOptions } = useOptionsStore();
  const { playerState, playerDispatch } = usePlayerStore();
  const { regionsState, regionsDispatch } = useRegionsStore();

  function isCrossing(arrayPosition){
    let i = 0;
    let isIt = false;
    while(i < regionsState.cross.length && isIt === false){
      if(regionsState.cross[i] === arrayPosition){
        isIt = true;
      }
      i++;
    }
    console.log('regionsState.cross : '+regionsState.cross)
    return isIt;
  }

  function specificMapButton(){
    if(regionsState.isObstacle[regionsState.clicked]){
      return(
        <button
        disabled={ playerState.preoccupationPoints > 0 && !isCrossing(regionsState.clicked) ? false : true }
        onClick={() => {
        playerDispatch({ type:'removePoints', range:1 });
        regionsDispatch({ type:'cross' });
        }}
        ><span role="img" aria-label="crossing">🚸</span> Franchir [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
      )
    } else {
      return(
        <button
        disabled={ playerState.preoccupationPoints > 0 ? false : true }
        onClick={() => {
        playerDispatch({ type:'removePoints', range:1 });
        regionsDispatch({ type:'explore' });
        }}
        ><span role="img" aria-label="compass">🧭</span> Explorer [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
      )
    }
  }

  function insideMap(){
    return(
      <div>
        <h1>{ regionsState.name[regionsState.clicked].charAt(0).toUpperCase() + regionsState.name[regionsState.clicked].slice(1) }</h1>
        <p><img alt='img of region discovered'
        src={GetImage(regionsState.type[regionsState.clicked])}
        /></p>
        <p>Coordonnées : { regionsState.coordinatesX[regionsState.clicked] };{ regionsState.coordinatesY[regionsState.clicked] }<br/>
        NB Zone Max : { regionsState.zoneMax[regionsState.clicked] }<br/>
        Zones : { regionsState.zoneTypes[regionsState.clicked] }</p>
        { specificMapButton() }
      </div>
    )
  }

  if(stateOfOptions.display !== 'full'){
    return(
      <div id='game-informations-div'>{ regionsState.clicked !== false && playerState.whichTab === 1 ? insideMap() : '' }</div>
    )
  } else {
    return(<div></div>)
  }
}

export default GameInformations;
