import React, { createContext, useContext, useReducer } from 'react';
import NameGenerator from '../misc-tools/name-generator/NameGenerator.js';

const GameTurnContext = createContext();
const REGIONS_NAMES = ['pineForest', 'pineLake']
const REGIONS_NAMES_FR = ['forêt de pins', 'lac de pins']
const ZONES_NAMES = ['field', 'forest', 'mine', 'rocks']
const ZONES_NAMES_FR = ['champs', 'forêt', 'mine', 'rochers']
const REGIONS_ZONES_POSSIBILITIES = [
  [1,3],//pineForest
  [0,1,2,3]//pineLake
];
const OBSTACLES_NAMES = ['sea', 'mountains', 'bridge']
const OBSTACLES_NAMES_FR = ['mer', 'montagnes', 'pont']
const INIT_COMPACT = initRegions();
const INITIAL_STATE = {
  technologiesMastered: [],
  technologiesDiscovered: [],
  turnNumber: 0,
  preoccupationPoints: 3,
  preoccupationPointsMax: 3,
  resourcesName: ['wood', 'stone', 'minerals', 'food'],
  resourcesCategory: ['resource', 'resource', 'resource', 'resource'],
  resourcesQuantity: [0,0,0,0],
  resourcesIsUnique: [false, false, false, false],
  whichTab: -1,

  clicked: false,
  coordinatesX: INIT_COMPACT[0],
  coordinatesY: INIT_COMPACT[1],
  isObstacle: INIT_COMPACT[2],
  type: INIT_COMPACT[3],
  name: INIT_COMPACT[4],
  zoneMax: INIT_COMPACT[5],
  zoneTypes: INIT_COMPACT[6],
  values: INIT_COMPACT[7],
  owner: INIT_COMPACT[8],
  cross: [],
  explore: []
};


////////////////////////////////////////////////////////////////////////////////
// FUNCTION // FUNCTION // FUNCTION // FUNCTION // FUNCTION // FUNCTION //
////////////////////////////////////////////////////////////////////////////////


function initRegions(){
  let iCoordinatesX = [0,0,1,0,-1];
  let iCoordinatesY = [0,1,0,-1,0];
  let iIsObstacle = [false, true, true, true, true];
  let iType = [];
  let iName = [];
  for(let i = 0; i < 5; i++){
    if(iIsObstacle[i]){
      let z = parseInt(Math.random()*OBSTACLES_NAMES.length)
      iType[i] = OBSTACLES_NAMES[z]
      iName[i] = OBSTACLES_NAMES_FR[z]+' de '+NameGenerator(3, 6)
    } else {
      let z = parseInt(Math.random()*REGIONS_NAMES.length)
      iType[i] = REGIONS_NAMES[z]
      iName[i] = REGIONS_NAMES_FR[z]+' de '+NameGenerator(3, 6)
    }
  }
  let iZoneMax = [parseInt(Math.random()*7)+6,0,0,0,0];//for region starter
  let iZoneTypes = [[],[],[],[],[]];
  let iValues = [[],[],[],[],[]];
  let iOwner = [[],['noOne'],['noOne'],['noOne'],['noOne']];
  return [iCoordinatesX, iCoordinatesY, iIsObstacle, iType, iName, iZoneMax, iZoneTypes, iValues, iOwner];
}


////////////////////////////////////////////////////////////////////////////////
// REDUCER // REDUCER // REDUCER // REDUCER // REDUCER // REDUCER // REDUCER //
////////////////////////////////////////////////////////////////////////////////


const gameTurnReducer = (state, action) => {
  let newTechnologiesMastered = state.technologiesMastered.slice()
  let newTechnologiesDiscovered = state.technologiesDiscovered.slice()
  let newTurnNumber = state.turnNumber
  let newPreoccupationPoints = state.preoccupationPoints
  let newPreoccupationPointsMax = state.preoccupationPointsMax
  let newResourcesName = state.resourcesName.slice()
  let newResourcesCategory = state.resourcesCategory.slice()
  let newResourcesQuantity = state.resourcesQuantity.slice()
  let newResourcesIsUnique = state.resourcesIsUnique.slice()
  let newWhichTab = state.whichTab
////////////////////////////////////////////////////////////////////////////////
  let newClicked = state.clicked
  let newCoordinatesX = state.coordinatesX.slice()
  let newCoordinatesY = state.coordinatesY.slice()
  let newIsObstacle = state.isObstacle.slice()
  let newType = state.type.slice()
  let newName = state.name.slice()
  let newZoneMax = state.zoneMax.slice()
  let newZoneTypes = []
  for(let row = 0; row < state.zoneTypes.length; row++){
    newZoneTypes[row] = state.zoneTypes[row].slice()
  }
  let newValues = state.values.slice()
  let newOwner = []
  for(let row = 0; row < state.owner.length; row++){
    newOwner[row] = state.owner[row].slice()
  }

  let newCross = state.cross.slice()
  let newExplore = state.explore.slice()
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  if (action.category === 'tabs' && Number.isInteger(action.value)) {
    newWhichTab = action.value
  } else if (action.category === 'informations' && typeof action.click !== 'undefined' && action.click !== null) {
    newClicked = action.click
  } else if (action.category === 'player') {
    switch (action.type) {
      case 'addPoints':
        newPreoccupationPoints += action.range
        break;

      case 'removePoints':
        newPreoccupationPoints -= action.range
        break;

      case 'resetPoints':
        newPreoccupationPoints = newPreoccupationPointsMax
        break;

      case 'setRes':
        newResourcesQuantity[action.index] = action.value
        break;

      case 'increaseRes':
        newResourcesQuantity[action.index] += action.range
        break;

      case 'decreaseRes':
        newResourcesQuantity[action.index] -= action.range
        break;

      default:
        throw new Error(`Unhandled player action type: ${action.type}`);
      }
  } else if (action.category === 'regions') {
    switch (action.type) {
      case 'cross':
      newPreoccupationPoints --
      newCross.push(newClicked)
      break;

      case 'explore':
      newPreoccupationPoints --
      newExplore.push(newClicked)
      break;

      default:
        throw new Error(`Unhandled regions action type: ${action.type}`);
    }
  } else if (action.category === 'technologies') {
    switch (action.type) {
      case 'addDiscoveredTech':
        newTechnologiesDiscovered.push(action.newTech)
        break;

      case 'addMasteredTech':
        newTechnologiesMastered.push(action.newTech)
        break;

      default:
        throw new Error(`Unhandled technologies action type: ${action.type}`);
      }
  } else if (action.category === 'endTurn') {
    newTurnNumber ++
    newPreoccupationPoints = state.preoccupationPointsMax
    newWhichTab = 0

    ////////////////////////////////////////////////////////////////////////////
    //                                  MAP                                   //
    ////////////////////////////////////////////////////////////////////////////

    // CROSS //
    for(let i = 0; i < newCross.length; i++){
      newOwner[newCross[i]] = ['player']
      if (Math.abs(newCoordinatesX[newCross[i]]%2) === 1 && newCoordinatesY[newCross[i]]%2 === 0) {//HORIZONTAL expansion
        //Check left or right
        let coordinatesNewRegion = []
        for (let j = 0; j < newName.length; j++){
          if(newCoordinatesX[j] === newCoordinatesX[newCross[i]]-1 && newCoordinatesY[j] === newCoordinatesY[newCross[i]]){
            coordinatesNewRegion.push([newCoordinatesX[j]+2,newCoordinatesY[j]])//exist left so push right (2: obstacle + free zone)
          } else if (newCoordinatesX[j] === newCoordinatesX[newCross[i]]+1 && newCoordinatesY[j] === newCoordinatesY[newCross[i]]) {
            coordinatesNewRegion.push([newCoordinatesX[j]-2,newCoordinatesY[j]])//exist right so push left (2: obstacle + free zone)
          }
        }
        //Create
        if (coordinatesNewRegion.length === 1){
          //new region
          newCoordinatesX.push(coordinatesNewRegion[0][0])
          newCoordinatesY.push(coordinatesNewRegion[0][1])
          newIsObstacle.push(false)
          let z = parseInt(Math.random()*REGIONS_NAMES.length)
          newType.push(REGIONS_NAMES[z])
          newName.push(REGIONS_NAMES_FR[z]+' de '+NameGenerator(3, 7))
          newZoneMax.push(parseInt(Math.random()*7)+6)
          newZoneTypes.push([])
          newValues.push([])
          newOwner.push([])
          //new obstacles
          let coordinatesObstaclesToCreate = []
          for (let j = 0; j < newName.length; j++){
            if(newCoordinatesX[j] === coordinatesNewRegion[0][0]-1 && newCoordinatesY[j] === coordinatesNewRegion[0][1]){
              coordinatesObstaclesToCreate.push('left')//exist left
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0]+1 && newCoordinatesY[j] === coordinatesNewRegion[0][1]) {
              coordinatesObstaclesToCreate.push('right')//exist right
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0] && newCoordinatesY[j] === coordinatesNewRegion[0][1]+1) {
              coordinatesObstaclesToCreate.push('up')//exist up
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0] && newCoordinatesY[j] === coordinatesNewRegion[0][1]-1) {
              coordinatesObstaclesToCreate.push('down')//exist down
            }
          }
          //console.log('obstacle exist in '+coordinatesObstaclesToCreate)
          if (!coordinatesObstaclesToCreate.includes('left')){
            newCoordinatesX.push(coordinatesNewRegion[0][0]-1)
            newCoordinatesY.push(coordinatesNewRegion[0][1])
          }
          if (!coordinatesObstaclesToCreate.includes('right')){
            newCoordinatesX.push(coordinatesNewRegion[0][0]+1)
            newCoordinatesY.push(coordinatesNewRegion[0][1])
          }
          if (!coordinatesObstaclesToCreate.includes('up')){
            newCoordinatesX.push(coordinatesNewRegion[0][0])
            newCoordinatesY.push(coordinatesNewRegion[0][1]+1)
          }
          if (!coordinatesObstaclesToCreate.includes('down')){
            newCoordinatesX.push(coordinatesNewRegion[0][0])
            newCoordinatesY.push(coordinatesNewRegion[0][1]-1)
          }
          for (let j = 0; j < 4-coordinatesObstaclesToCreate.length; j++){
            newIsObstacle.push(true)
            let z = parseInt(Math.random()*OBSTACLES_NAMES.length)
            newType.push(OBSTACLES_NAMES[z])
            newName.push(OBSTACLES_NAMES_FR[z]+' de '+NameGenerator(3, 7))
            newZoneMax.push(0)
            newZoneTypes.push([])
            newValues.push([])
            newOwner.push(['noOne'])
          }
          //console.log('nCX length> '+newCoordinatesX.length+' - nName length> '+newName.length)
        }//end of Create
      } else if (newCoordinatesX[newCross[i]]%2 === 0 && Math.abs(newCoordinatesY[newCross[i]]%2) === 1) {//VERTICAL expansion
        //Check up or down
        let coordinatesNewRegion = []
        for (let j = 0; j < newName.length; j++){
          if(newCoordinatesX[j] === newCoordinatesX[newCross[i]] && newCoordinatesY[j] === newCoordinatesY[newCross[i]]+1){
            coordinatesNewRegion.push([newCoordinatesX[j],newCoordinatesY[j]-2])//exist up so push down (2: obstacle + free zone)
          } else if (newCoordinatesX[j] === newCoordinatesX[newCross[i]] && newCoordinatesY[j] === newCoordinatesY[newCross[i]]-1) {
            coordinatesNewRegion.push([newCoordinatesX[j],newCoordinatesY[j]+2])//exist down so push up (2: obstacle + free zone)
          }
        }
        //Create
        if (coordinatesNewRegion.length === 1){
          //new region
          newCoordinatesX.push(coordinatesNewRegion[0][0])
          newCoordinatesY.push(coordinatesNewRegion[0][1])
          newIsObstacle.push(false)
          let z = parseInt(Math.random()*REGIONS_NAMES.length)
          newType.push(REGIONS_NAMES[z])
          newName.push(REGIONS_NAMES_FR[z]+' de '+NameGenerator(3, 7))
          newZoneMax.push(parseInt(Math.random()*7)+6)
          newZoneTypes.push([])
          newValues.push([])
          newOwner.push([])
          //new obstacles
          let coordinatesObstaclesToCreate = []
          for (let j = 0; j < newName.length; j++){
            if(newCoordinatesX[j] === coordinatesNewRegion[0][0]-1 && newCoordinatesY[j] === coordinatesNewRegion[0][1]){
              coordinatesObstaclesToCreate.push('left')//exist left
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0]+1 && newCoordinatesY[j] === coordinatesNewRegion[0][1]) {
              coordinatesObstaclesToCreate.push('right')//exist right
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0] && newCoordinatesY[j] === coordinatesNewRegion[0][1]+1) {
              coordinatesObstaclesToCreate.push('up')//exist up
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0] && newCoordinatesY[j] === coordinatesNewRegion[0][1]-1) {
              coordinatesObstaclesToCreate.push('down')//exist down
            }
          }
          //console.log('obstacle exist in '+coordinatesObstaclesToCreate)
          if (!coordinatesObstaclesToCreate.includes('left')){
            newCoordinatesX.push(coordinatesNewRegion[0][0]-1)
            newCoordinatesY.push(coordinatesNewRegion[0][1])
          }
          if (!coordinatesObstaclesToCreate.includes('right')){
            newCoordinatesX.push(coordinatesNewRegion[0][0]+1)
            newCoordinatesY.push(coordinatesNewRegion[0][1])
          }
          if (!coordinatesObstaclesToCreate.includes('up')){
            newCoordinatesX.push(coordinatesNewRegion[0][0])
            newCoordinatesY.push(coordinatesNewRegion[0][1]+1)
          }
          if (!coordinatesObstaclesToCreate.includes('down')){
            newCoordinatesX.push(coordinatesNewRegion[0][0])
            newCoordinatesY.push(coordinatesNewRegion[0][1]-1)
          }
          for (let j = 0; j < 4-coordinatesObstaclesToCreate.length; j++){
            newIsObstacle.push(true)
            let z = parseInt(Math.random()*OBSTACLES_NAMES.length)
            newType.push(OBSTACLES_NAMES[z])
            newName.push(OBSTACLES_NAMES_FR[z]+' de '+NameGenerator(3, 7))
            newZoneMax.push(0)
            newZoneTypes.push([])
            newValues.push([])
            newOwner.push(['noOne'])
          }
          //console.log('nCX length> '+newCoordinatesX.length+' - nName length> '+newName.length)
        }//end of Create
      } else {
        throw new Error(`Unhandled cross in game-turn-store: for position:${newCross[i]} X:${newCoordinatesX[newCross[i]]} Y:${newCoordinatesY[newCross[i]]}`);
      }
    }
    newCross = []

    // EXPLORE //
    for(let i = 0; i < newExplore.length; i++){
      let regionNamePosition = REGIONS_NAMES.indexOf(newType[newExplore[i]])
      let zoneTypePosition = REGIONS_ZONES_POSSIBILITIES[regionNamePosition][parseInt(Math.random()*REGIONS_ZONES_POSSIBILITIES[regionNamePosition].length)]
      if(newZoneTypes[newExplore[i]].length < newZoneMax[newExplore[i]]){
        newZoneTypes[newExplore[i]].push(ZONES_NAMES[zoneTypePosition]);
        newOwner[newExplore[i]].push('player');
        switch(zoneTypePosition){
          case 0:
            newResourcesQuantity[3]++
            break;
          case 1:
            newResourcesQuantity[0]++
            break;
          case 2:
            newResourcesQuantity[2]++
            break;
          case 3:
            newResourcesQuantity[1]++
            break;
          default:
            throw new Error(`Unhandled zoneTypePosition: ${zoneTypePosition}`);
        }
      }
    }
    newExplore = []

    ////////////////////////////////////////////////////////////////////////////
    //                              TECHNOLOGIES                              //
    ////////////////////////////////////////////////////////////////////////////

  } else {
    //throw new Error(`Unhandled action type: ${action.actegorie}`);
  }
////////////////////////////////////////////////////////////////////////////////

  return {
    technologiesMastered: newTechnologiesMastered,
    technologiesDiscovered: newTechnologiesDiscovered,
    turnNumber: newTurnNumber,
    preoccupationPoints: newPreoccupationPoints,
    preoccupationPointsMax: newPreoccupationPointsMax,
    resourcesName: newResourcesName,
    resourcesCategory: newResourcesCategory,
    resourcesQuantity: newResourcesQuantity,
    resourcesIsUnique: newResourcesIsUnique,
    whichTab: newWhichTab,

    clicked: newClicked,
    coordinatesX: newCoordinatesX,
    coordinatesY: newCoordinatesY,
    isObstacle: newIsObstacle,
    type: newType,
    name: newName,
    zoneMax: newZoneMax,
    zoneTypes: newZoneTypes,
    values: newValues,
    owner: newOwner,
    cross: newCross,
    explore: newExplore
  }
}

export const GameTurnProvider = ({ children }) => {
    const [gameTurnState, gameTurnDispatch] = useReducer(gameTurnReducer, INITIAL_STATE);

    return (
        <GameTurnContext.Provider value= {{ gameTurnState, gameTurnDispatch }}>
            { children }
        </GameTurnContext.Provider>
    )
}

export const useGameTurnStore = () => useContext(GameTurnContext);
