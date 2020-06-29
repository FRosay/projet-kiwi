import React from 'react';
import { usePlayerStore } from '../player/player-store.js';
import { useRegionsStore } from '../regions/regions-store.js';


function Map() {
  const { state, dispatch } = usePlayerStore();
  const { stateOfRegions, dispatchInRegions } = useRegionsStore();

  function tilesPlacement(){
    let tilesObject = []
    for(let row = 0; row < stateOfRegions.regionIsDiscovered.length; row ++){
      tilesObject.push(<tr key={row}>{rowPlacement(row)}</tr>)
    }
    return tilesObject
  }

  function rowPlacement(row){
    let rowObject = []
    for(let col = 0; col < stateOfRegions.regionIsDiscovered[row].length; col++){
      if(stateOfRegions.regionIsDiscovered[row][col]){
        let ppSpendedHere = 0
        for(let i = 0; i < state.exploration.length; i++){
          if(state.exploration[i][0] === row && state.exploration[i][1] === col){
            ppSpendedHere ++
          }
        }
        for(let i = 0; i < state.cross.length; i++){
          if(state.cross[i][0] === row && state.cross[i][1] === col){
            ppSpendedHere ++
          }
        }
        rowObject.push(
          <td key={[row,col]}>
          {ppSpendedHere > 0 && <img alt='img of pp'
          className={'pp-map'}
          src={require('../../assets/images/preoccupation-point.png')}
          />}
          <img alt='img of region discovered'
          onClick={() => dispatchInRegions({key:[row,col]})}
          src={require('../../assets/images/'+stateOfRegions.regionType[row][col]+'s/'+stateOfRegions.regionName[row][col]+'.png')}
          style={{cursor:'pointer'}}
          />
          </td>
      )
      }else{
        rowObject.push(
          <td key={[row,col]}><img alt='img of region undiscovered' src={require('../../assets/images/regions/undiscovered.png')} /></td>
        )
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
