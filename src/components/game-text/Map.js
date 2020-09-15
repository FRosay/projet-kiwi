import React from 'react';
import { useRegionsStore } from '../regions/regions-store.js';
import GetImage from '../GraphicResources.js'


function Map() {
  const { regionsState, regionsDispatch } = useRegionsStore();

  function tilesPlacement(){
    let tilesObject = []
    for(let row = Math.max.apply(null, regionsState.coordinatesY); row >= Math.min.apply(null, regionsState.coordinatesY); row--){
      tilesObject.push(<tr key={row}>{rowPlacement(row)}</tr>)
    }
    return tilesObject
  }

  function rowPlacement(row){
    let rowObject = []
    for(let col = Math.min.apply(null, regionsState.coordinatesX); col <= Math.max.apply(null, regionsState.coordinatesX); col++){
      let index = regionIndex(row,col)
      if(index === false){
        rowObject.push(
          <td key={[row,col]}><img alt='img of region undiscovered'
          src={GetImage('undiscovered')} /></td>
        )
      } else if (regionsState.coordinatesX[regionsState.clicked] === col && regionsState.coordinatesY[regionsState.clicked] === row) {
        rowObject.push(
          <td key={[row,col]} style={{position: 'relative'}}>
          <img alt='border img'
          className={'border-image-of-region-discovered-checked'}
          src={GetImage(regionsState.type[index])}
          style={{position:'absolute'}}
          />
          <img alt='img of region discovered'
          onClick={() => regionsDispatch({click:index})}
          src={GetImage(regionsState.type[index])}
          style={{cursor:'pointer', position:'relative'}}
          />
          </td>
        )
      } else {
        rowObject.push(
          <td key={[row,col]}>
          <img alt='img of region discovered'
          onClick={() => regionsDispatch({click:index})}
          src={GetImage(regionsState.type[index])}
          style={{cursor:'pointer'}}
          />
          </td>
        )
      }
    }
    return rowObject
  }

  function regionIndex(row,col){
    let firstI = [];
    let ret = false;
    for(let r = 0; r < regionsState.coordinatesY.length; r++){
      if(regionsState.coordinatesY[r] === row){firstI.push(r)}
    }
    for(let c = 0; c < firstI.length; c++){
      if(regionsState.coordinatesX[firstI[c]] === col){ret = firstI[c]}
    }
    return ret
  }

  /*function royPlacement(row){
    let rowObject = []

    for(let col = 0; col < regionsState.regionIsDiscovered[row].length; col++){
      if(regionsState.regionIsDiscovered[row][col]){
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
          onClick={() => regionsDispatch({key:[row,col]})}
          src={GetImage(regionsState.regionName[row][col])}
          style={{cursor:'pointer'}}
          />
          </td>
        )
      } else {
        rowObject.push(
          <td key={[row,col]}><img alt='img of region undiscovered'
          onClick={() => regionsDispatch({newRegion:true})}
          src={GetImage('undiscovered')} /></td>
        )
      }
    }

    return rowObject
  }*/

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
