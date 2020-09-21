import React from 'react';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';
import GetImage from '../GraphicResources.js'


function Map() {
  const { gameTurnState, gameTurnDispatch } = useGameTurnStore();

  function tilesPlacement(){
    let tilesObject = []
    for(let row = Math.max.apply(null, gameTurnState.coordinatesY); row >= Math.min.apply(null, gameTurnState.coordinatesY); row--){
      tilesObject.push(<tr key={row}>{rowPlacement(row)}</tr>)
    }
    return tilesObject
  }

  function rowPlacement(row){
    let rowObject = []
    for(let col = Math.min.apply(null, gameTurnState.coordinatesX); col <= Math.max.apply(null, gameTurnState.coordinatesX); col++){
      let index = regionIndex(row,col)
      if(index === false){
        rowObject.push(
          <td key={[row,col]}><img alt='img of region undiscovered'
          src={GetImage('undiscovered')} /></td>
        )
      } else if (gameTurnState.coordinatesX[gameTurnState.clicked] === col && gameTurnState.coordinatesY[gameTurnState.clicked] === row) {
        rowObject.push(
          <td key={[row,col]} style={{position: 'relative'}}>
          <img alt='border img'
          className={'border-image-of-region-discovered-checked'}
          src={GetImage(gameTurnState.type[index])}
          style={{position:'absolute'}}
          />
          <img alt='img of region discovered'
          src={GetImage(gameTurnState.type[index])}
          style={{position:'relative'}}
          />
          </td>
        )
      } else {
        rowObject.push(
          <td key={[row,col]}>
          <img alt='img of region discovered'
          className={gameTurnState.isObstacle[index] && gameTurnState.owner[index][0] === 'player' ? 'obstacle-crossed' : ''}
          onClick={() => gameTurnDispatch({category:'informations', click:index})}
          src={GetImage(gameTurnState.type[index])}
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
    for(let r = 0; r < gameTurnState.coordinatesY.length; r++){
      if(gameTurnState.coordinatesY[r] === row){firstI.push(r)}
    }
    for(let c = 0; c < firstI.length; c++){
      if(gameTurnState.coordinatesX[firstI[c]] === col){ret = firstI[c]}
    }
    return ret
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
