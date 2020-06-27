import React from 'react';
import { useRegionsStore } from '../regions/regions-store.js';


function GameInformations() {
  const { state, dispatch } = useRegionsStore();

  function specificButton(){
    return(
      <button>{ state.regionType[state.clicked[0]][state.clicked[1]].startsWith('region') ? 'Explorer' : 'Franchir' }</button>
    )
  }

  return(
    <div id='game-informations-div'>
      <h1>Header</h1>
      <p>Coordonnées : { state.clicked[0] };{ state.clicked[1] }<br/>
      Type : { state.regionType[state.clicked[0]][state.clicked[1]] }<br/>
      Zone Max : { state.regionZoneMax[state.clicked[0]][state.clicked[1]] }</p>
      { specificButton() }
    </div>
  )
}

export default GameInformations;
