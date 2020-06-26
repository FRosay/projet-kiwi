import React from 'react';
import { useRegionsStore } from '../regions/regions-store.js';

function Map() {
  const { state, dispatch } = useRegionsStore();

  function tilesPlacement(){
    let tilesObject = []
    for(let row = 0; row < state.regionIsDiscovered.length; row ++){
      tilesObject.push(<tr key={row}>{rowPlacement(row)}</tr>)
    }
    return tilesObject
  }

  function rowPlacement(row){
    let rowObject = []
    for(let col = 0; col < state.regionIsDiscovered[row].length; col++){
      if(state.regionIsDiscovered[row][col]){
        rowObject.push(<td key={[row,col]}><img alt='img of region discovered' src={require('../../assets/images/regions/'+state.regionType[row][col]+'.png')} /></td>)
      }else{
        rowObject.push(<td key={[row,col]}><img alt='img of region undiscovered' src={require('../../assets/images/regions/region-undiscovered.png')} /></td>)
      }
    }
    return rowObject
  }

  return(
      <div>
      <h1>Carte</h1>
      <div style={{textAlign: 'center'}}>
      <table style={{display: 'inline-block'}}><tbody>{ tilesPlacement() }</tbody></table>
      </div>
      </div>
  )
}

export default Map;
