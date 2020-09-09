import React from 'react';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';
import { useOptionsStore } from '../options/options-store.js';
import { usePlayerStore } from '../player/player-store.js';
import { useRegionsStore } from '../regions/regions-store.js';
import GetImage from '../GraphicResources.js'


function GameInformations() {
  const { gameTurnState, gameTurnDispatch } = useGameTurnStore();
  const { stateOfOptions } = useOptionsStore();
  const { playerState, playerDispatch } = usePlayerStore();
  const { stateOfRegions } = useRegionsStore();

  function specificMapButton(){
    if(stateOfRegions.zoneMax[stateOfRegions.clicked] > 0){
      return(
        <button
        disabled={ playerState.preoccupationPoints > 0 ? false : true }
        onClick={() => gameTurnDispatch({ type:'explore', value:stateOfRegions.clicked }) }
        ><span role="img" aria-label="compass">🧭</span> Explorer [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
      )
    } else {
      return(
        <button
        disabled={ playerState.preoccupationPoints > 0 ? false : true }
        onClick={() => gameTurnDispatch({ type:'cross', value: stateOfRegions.clicked })}
        ><span role="img" aria-label="crossing">🚸</span> Franchir [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
      )
    }
  }

  function insideMap(){
    return(
      <div>
        <h1>{ stateOfRegions.name[stateOfRegions.clicked] }</h1>
        <p><img alt='img of region discovered'
        src={GetImage(stateOfRegions.type[stateOfRegions.clicked])}
        /></p>
        <p>Coordonnées : { stateOfRegions.coordinatesX[stateOfRegions.clicked] };{ stateOfRegions.coordinatesY[stateOfRegions.clicked] }<br/>
        NB Zone Max : { stateOfRegions.zoneMax[stateOfRegions.clicked] }<br/>
        Zones : { stateOfRegions.zoneTypes[stateOfRegions.clicked] }</p>
        { specificMapButton() }
      </div>
    )
  }

  if(stateOfOptions.display !== 'full'){
    return(
      <div id='game-informations-div'>{ stateOfRegions.clicked !== false && playerState.whichTab === 1 ? insideMap() : '' }</div>
    )
  } else {
    return(<div></div>)
  }
}

export default GameInformations;
