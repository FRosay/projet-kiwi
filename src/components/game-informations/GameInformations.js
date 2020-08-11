import React from 'react';
import { usePlayerStore } from '../player/player-store.js';
import { useRegionsStore } from '../regions/regions-store.js';


function GameInformations() {
  const { playerState, playerDispatch } = usePlayerStore();
  const { stateOfRegions, dispatchInRegions } = useRegionsStore();

  function specificMapButton(){
    if(stateOfRegions.regionType[stateOfRegions.clicked[0]][stateOfRegions.clicked[1]] === 'region'){
      return(
        <button
        disabled={ playerState.preoccupationPoints > 0 ? false : true }
        onClick={() => playerDispatch({ type:'exploration', value:[stateOfRegions.clicked[0],stateOfRegions.clicked[1]] })}
        >Explorer</button>
      )
    } else {
      return(
        <button
        disabled={ playerState.preoccupationPoints > 0 ? false : true }
        onClick={() => playerDispatch({ type:'cross', value:[stateOfRegions.clicked[0],stateOfRegions.clicked[1]] })}
        >Franchir</button>
      )
    }
  }

  function insideMap(){
    return(
      <div>
        <h1>Header</h1>
        <p>Coordonnées : { stateOfRegions.clicked[0] };{ stateOfRegions.clicked[1] }<br/>
        Type : { stateOfRegions.regionName[stateOfRegions.clicked[0]][stateOfRegions.clicked[1]] }<br/>
        Zone Max : { stateOfRegions.regionZoneMax[stateOfRegions.clicked[0]][stateOfRegions.clicked[1]] }</p>
        { specificMapButton() }
      </div>
    )
  }

  return(
    <div id='game-informations-div'>{ stateOfRegions.clicked !== false ? insideMap() : '' }</div>
  )
}

export default GameInformations;
