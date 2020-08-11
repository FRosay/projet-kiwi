import React from 'react';
import { usePlayerStore } from '../player/player-store.js';
import { useRegionsStore } from '../regions/regions-store.js';
import GetImage from '../GraphicResources.js'


function Map() {
  const { playerState, playerDispatch } = usePlayerStore();
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
        let ppSpentHere = 0
        for(let i = 0; i < playerState.exploration.length; i++){
          if(playerState.exploration[i][0] === row && playerState.exploration[i][1] === col){
            ppSpentHere ++
          }
        }
        for(let i = 0; i < playerState.cross.length; i++){
          if(playerState.cross[i][0] === row && playerState.cross[i][1] === col){
            ppSpentHere ++
          }
        }
        rowObject.push(
          <td key={[row,col]}>
          {ppSpentHere > 0 && <img alt='img of pp'
          className={'pp-map'}
          src={GetImage('preoccupationPoint')}
          />}
          <img alt='img of region discovered'
          onClick={() => dispatchInRegions({key:[row,col]})}
          src={GetImage(stateOfRegions.regionName[row][col])}
          style={{cursor:'pointer'}}
          />
          </td>
        )
      } else {
        rowObject.push(
          <td key={[row,col]}><img alt='img of region undiscovered' src={GetImage('undiscovered')} /></td>
        )
      }
    }
    
    return rowObject
  }

  return(
      <div>
        <h1>Carte</h1>
        <div style={{textAlign: 'center'}}>
          <table style={{display: 'inline-block'}}>
            <tbody>{ tilesPlacement() }</tbody>
          </table>
        </div>
      </div>
  )
}

export default Map;
