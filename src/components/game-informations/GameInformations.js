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
    return isIt;
  }

  function specificMapButton(){
    if (gameTurnState.isUncrossed[gameTurnState.clicked] && gameTurnState.zoneOwner[gameTurnState.clicked].length === 0) {
      return(
        <button
        disabled={ gameTurnState.preoccupationPoints > 0 && !isCrossing(gameTurnState.clicked) ? false : true }
        onClick={() => {
        gameTurnDispatch({ category:'regions', type:'cross' });
        }}
        ><span role="img" aria-label="crossing">🚸</span> Franchir [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
      )
    } else if (!gameTurnState.isUncrossed[gameTurnState.clicked] && gameTurnState.zoneTypes[gameTurnState.clicked].length < gameTurnState.zoneMax[gameTurnState.clicked]) {
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
    let zones = []
    for(let i = 0; i < gameTurnState.zoneTypes[gameTurnState.clicked].length; i++){
      let bgColor
      if(gameTurnState.zoneOwner[gameTurnState.clicked][i] === 'player'){
        bgColor = stateOfOptions.playerColor
      } else if(gameTurnState.zoneOwner[gameTurnState.clicked][i] === 'ally'){
        bgColor = stateOfOptions.allyColor
      } else if(gameTurnState.zoneOwner[gameTurnState.clicked][i] === 'enemy'){
        bgColor = stateOfOptions.enemyColor
      } else if(gameTurnState.zoneOwner[gameTurnState.clicked][i] === 'neutral'){
        bgColor = stateOfOptions.neutralColor
      }
      zones.push(
        <img alt='resource discovered'
        key={i}
        src={GetImage(gameTurnState.zoneTypes[gameTurnState.clicked][i])}
        style={{backgroundColor:bgColor}}
        />
      )
      if(i+1 < gameTurnState.zoneTypes[gameTurnState.clicked].length){
        zones.push(' ')
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
        (zoneOwner : {gameTurnState.zoneOwner[gameTurnState.clicked]} )<br/>
        (nb zones max : { gameTurnState.zoneMax[gameTurnState.clicked] })<br/>
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
