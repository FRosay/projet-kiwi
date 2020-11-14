import React from 'react';
import { useOptionsStore } from '../options/options-store.js';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';
import GetImage from '../GraphicResources.js'


function GameInformations() {
  const { stateOfOptions } = useOptionsStore();
  const { gameTurnState, gameTurnDispatch } = useGameTurnStore();

  function xyToIndex(x,y){
    let index = -1
    for(let i = 0; i < gameTurnState.regionType.length; i++){
      if(gameTurnState.coordinatesX[i] === x && gameTurnState.coordinatesY[i] === y){
        index = i
      }
    }
    return index
  }

  function mapPpCostLinkToCamp(){
    let cost = -1
    let indexChecked = []
    let indexToCheck = [gameTurnState.clicked]//start
    let indexToCheckNext = []
    let distance = 0

    while (cost === -1) {
      for(let i = 0; i < indexToCheck.length; i++){
        let x = gameTurnState.coordinatesX[indexToCheck[i]]
        let y = gameTurnState.coordinatesY[indexToCheck[i]]
        //console.log('--CHECKING '+x+','+y)
        //check if camp HERE
        let isCamp = false
        for(let j = 0; j < gameTurnState.zoneTypes[indexToCheck[i]].length; j++){
          if(gameTurnState.zoneTypes[indexToCheck[i]][j] === 'camp'){
            isCamp = true
          }
        }
        //set cost OR add index to check
        if(gameTurnState.zoneTypes[indexToCheck[i]].length > 0 && isCamp){
          cost = distance
        } else {
          //push adjacent index if not in checked or to check next
          if(xyToIndex(x,y+1) !== -1 && !gameTurnState.isUncrossed[xyToIndex(x,y+1)] && indexChecked.indexOf(xyToIndex(x,y+1)) === -1 && indexToCheck.indexOf(xyToIndex(x,y+1)) === -1){//top
            indexToCheckNext.push(xyToIndex(x,y+1))
          }
          if(xyToIndex(x,y-1) !== -1 && !gameTurnState.isUncrossed[xyToIndex(x,y-1)] && indexChecked.indexOf(xyToIndex(x,y-1)) === -1 && indexToCheck.indexOf(xyToIndex(x,y-1)) === -1){//bottom
            indexToCheckNext.push(xyToIndex(x,y-1))
          }
          if(xyToIndex(x-1,y) !== -1 && !gameTurnState.isUncrossed[xyToIndex(x-1,y)] && indexChecked.indexOf(xyToIndex(x-1,y)) === -1 && indexToCheck.indexOf(xyToIndex(x-1,y)) === -1){//left
            indexToCheckNext.push(xyToIndex(x-1,y))
          }
          if(xyToIndex(x+1,y) !== -1 && !gameTurnState.isUncrossed[xyToIndex(x+1,y)] && indexChecked.indexOf(xyToIndex(x+1,y)) === -1 && indexToCheck.indexOf(xyToIndex(x+1,y)) === -1){//right
            indexToCheckNext.push(xyToIndex(x+1,y))
          }
        }
      }
      //push
      for(let i = 0; i < indexToCheck.length; i++){
        indexChecked.push(indexToCheck[i])
      }
      indexToCheck = []
      for(let i = 0; i < indexToCheckNext.length; i++){
        indexToCheck.push(indexToCheckNext[i])
      }
      indexToCheckNext = []
      distance ++
    }

    return cost+1
  }

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
    let ppCost = mapPpCostLinkToCamp()

    if (gameTurnState.isUncrossed[gameTurnState.clicked] && gameTurnState.zoneOwner[gameTurnState.clicked].length === 0) {
      return(
        <button
        disabled={ gameTurnState.preoccupationPoints >= ppCost && !isCrossing(gameTurnState.clicked) ? false : true }
        onClick={() => {
        gameTurnDispatch({ category:'regions', type:'cross', cost:ppCost });
        }}
        ><span role="img" aria-label="crossing">🚸</span> Franchir [-{ppCost} <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
      )
    } else if (!gameTurnState.isUncrossed[gameTurnState.clicked] && gameTurnState.zoneTypes[gameTurnState.clicked].length < gameTurnState.zoneMax[gameTurnState.clicked]) {
      return(
        <button
        disabled={ gameTurnState.preoccupationPoints >= ppCost ? false : true }
        onClick={() => {
        gameTurnDispatch({ category:'regions', type:'explore', cost:ppCost });
        }}
        ><span role="img" aria-label="compass">🧭</span> Explorer [-{ppCost} <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button>
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
      return(<div><b>{ gameTurnState.zoneTypes[gameTurnState.clicked][gameTurnState.subClick] }</b> appartenant aux <b>{ gameTurnState.zoneOwner[gameTurnState.clicked][gameTurnState.subClick] }</b><br/><br/>{ displayMapActions() }</div>)
    }
  }

  function displayMapActions(){
    let actionsPossibilities = []
    let tribeToGift = []
    for(let i = 0; i < gameTurnState.relationsName.length; i++){
      tribeToGift.push(<button onClick={() => gameTurnDispatch({category:'gift', click:gameTurnState.clicked, subClick:gameTurnState.subClick, tribe:gameTurnState.relationsName[i]})} key={gameTurnState.relationsName[i]}>
        {gameTurnState.relationsName[i]} ({gameTurnState.relationsSpecies[i]})
        </button>)
    }
    if(gameTurnState.zoneOwner[gameTurnState.clicked][gameTurnState.subClick] === 'player' && gameTurnState.zoneTypes[gameTurnState.clicked][gameTurnState.subClick] !== 'workInProgress' && gameTurnState.zoneTypes[gameTurnState.clicked][gameTurnState.subClick] !== 'camp'){
      actionsPossibilities.push(<details key='build'><summary><span role="img" aria-label="hammer-pick">⚒️</span> Construire...</summary><button onClick={() => gameTurnDispatch({category:'build', type:'camp', click:gameTurnState.clicked, subClick:gameTurnState.subClick})} disabled={gameTurnState.preoccupationPoints >= 1 ? false : true}><img alt='camp' src={GetImage('camp')}/> Camp [-1 <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/>]</button></details>)
      actionsPossibilities.push(<details key='gift'><summary><span role="img" aria-label="gift">🎁</span> Offrir à...</summary>{tribeToGift}</details>)
    }
    return actionsPossibilities
  }

  function insideMap(){
    return(
      <div>
        <h1>{ gameTurnState.regionName[gameTurnState.clicked].charAt(0).toUpperCase() + gameTurnState.regionName[gameTurnState.clicked].slice(1) }</h1>
        <h1>TEST</h1><h1>RETEST</h1>
        <p><img alt='img of region discovered'
        src={GetImage(gameTurnState.regionType[gameTurnState.clicked])}
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
