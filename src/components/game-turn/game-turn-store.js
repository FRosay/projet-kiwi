import React, { createContext, useContext, useReducer } from 'react';

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
      iName[i] = OBSTACLES_NAMES_FR[z]+' de Folfaire'
    } else {
      let z = parseInt(Math.random()*REGIONS_NAMES.length)
      iType[i] = REGIONS_NAMES[z]
      iName[i] = REGIONS_NAMES_FR[z]+' de Folfaire'
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
    // MAP //
    //Cross
    for(let i = 0; i < newCross.length; i++){
      newOwner[newCross[i]] = ['player']
    }
    newCross = []
    //Explore
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
    //TECHNOLOGIES
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
