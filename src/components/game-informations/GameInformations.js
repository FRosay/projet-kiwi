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
        <img alt='zone discovered'
        key={i}
        className={'interactable'}
        onClick={() => gameTurnDispatch({category:'informations', click:gameTurnState.clicked, subClick:i})}
        src={GetImage(gameTurnState.zoneTypes[gameTurnState.clicked][i])}
        style={{backgroundColor:bgColor, borderBottom:(gameTurnState.subClick === i ? '8px solid transparent' : 'none')}}
        />
      )
      if(i+1 < gameTurnState.zoneTypes[gameTurnState.clicked].length){
        zones.push(' ')
      }
    }
    return(zones)
  }

  function displayMapZoneInfo(){
    if(gameTurnState.subClick !== false){
      return(<table><tbody>
          <tr><td>Nom :</td><td>{ gameTurnState.zoneTypes[gameTurnState.clicked][gameTurnState.subClick] }</td></tr>
          <tr><td>Proprio :</td><td>{ gameTurnState.zoneOwner[gameTurnState.clicked][gameTurnState.subClick] }</td></tr>
          <tr><td>Action :</td><td>{ gameTurnState.zoneOwner[gameTurnState.clicked][gameTurnState.subClick] === 'player' && gameTurnState.zoneTypes[gameTurnState.clicked][gameTurnState.subClick] !== 'workInProgress' && gameTurnState.zoneTypes[gameTurnState.clicked][gameTurnState.subClick] !== 'camp' ?
          <button onClick={() => gameTurnDispatch({category:'build', type:'camp', click:gameTurnState.clicked, subClick:gameTurnState.subClick})}><span role="img" aria-label="hammer-pick">⚒️</span> Raser pour un camp [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button> : '...' }</td></tr>
        </tbody></table>)
    }
  }

  function insideMap(){
    return(
      <div>
        <h1>{ gameTurnState.name[gameTurnState.clicked].charAt(0).toUpperCase() + gameTurnState.name[gameTurnState.clicked].slice(1) }</h1>
        <p><img alt='img of region discovered'
        src={GetImage(gameTurnState.type[gameTurnState.clicked])}
        /></p>
        { specificMapButton() }
        <p>(coord : { gameTurnState.coordinatesX[gameTurnState.clicked] };{ gameTurnState.coordinatesY[gameTurnState.clicked] })<br/>
        (zoneMax : { gameTurnState.zoneMax[gameTurnState.clicked] })</p>
        <h2>Zones</h2>
        { displayMapZones() }
        { displayMapZoneInfo() }
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
