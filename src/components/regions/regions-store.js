import React, { createContext, useContext, useReducer } from 'react';

const RegionsContext = createContext();
const REGIONS_NAMES = ['pineForest', 'pineLake']
const REGIONS_NAMES_FR = ['forêt de pins', 'lac de pins']
const ZONES_NAMES = ['field', 'foret', 'mine', 'rocks']
const ZONES_NAMES_FR = ['champs', 'forêt', 'mine', 'rochers']
const REGIONS_ZONES_POSSIBILITIES = {
  pineForest: [0,1,3],
  pineLake: [1,2,3]
};
const OBSTACLES_NAMES = ['sea', 'mountains', 'bridge']
const OBSTACLES_NAMES_FR = ['mer', 'montagnes', 'pont']
const INIT_COMPACT = init();
const INITIAL_STATE = {
  clicked: false,
  coordinatesX: INIT_COMPACT[0],
  coordinatesY: INIT_COMPACT[1],
  isObstacle: INIT_COMPACT[2],
  type: INIT_COMPACT[3],
  name: INIT_COMPACT[4],
  zoneMax: INIT_COMPACT[5],
  zoneTypes: INIT_COMPACT[6],
  values: INIT_COMPACT[7],
  cross: [],
  explore: []
};

function init(){
  let iCoordinatesX = [0,-1,0,1,0];
  let iCoordinatesY = [0,0,1,0,-1];
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
  let iZoneMax = [parseInt(Math.random()*7)+6,0,0,0,0];
  let iZoneTypes = [];
  let iValues = [[],[],[],[],[]];
  return [iCoordinatesX, iCoordinatesY, iIsObstacle, iType, iName, iZoneMax, iZoneTypes, iValues];
}

function cross(position){
  for(let i = 0; i < position.length; i++){
    console.log('cest cross')
  }
}

const regionsReducer = (state, action) => {
  let newClicked = state.clicked

  let newCoordinatesX = state.coordinatesX
  let newCoordinatesY = state.coordinatesY
  let newIsObstacle = state.isObstacle
  let newType = state.type
  let newName = state.name
  let newZoneMax = state.zoneMax
  let newZoneTypes = []
  for(let row = 0; row < state.zoneTypes.length; row++){
    newZoneTypes[row] = state.zoneTypes[row].slice()
  }
  let newValues = state.values

  let newCross = state.cross
  let newExplore = state.explore

  if (action.type === 'endTurn') {
    console.log('endTurn')
    //CROSS ACTIONS
    cross(newCross);
    //newCross = [];
    //EXPLORE ACTIONS
    //newExplore = [];
  } else if(action.type === 'cross'){
    console.log("crosss > "+newClicked)
    newCross.push(newClicked)
  } else if(action.type === 'explore'){
    console.log("explore > "+newClicked)
  }
  if (typeof action.click !== 'undefined' && action.click !== null) {
    newClicked = action.click
  }

  return{
    clicked: newClicked,
    coordinatesX: newCoordinatesX,
    coordinatesY: newCoordinatesY,
    isObstacle: newIsObstacle,
    type: newType,
    name: newName,
    zoneMax: newZoneMax,
    zoneTypes: newZoneTypes,
    values: newValues,
    cross: newCross,
    explore: newExplore
  }
}

export const RegionsProvider = ({ children }) => {
    const [regionsState, regionsDispatch] = useReducer(regionsReducer, INITIAL_STATE);

    return (
        <RegionsContext.Provider value= {{ regionsState, regionsDispatch }}>
            { children }
        </RegionsContext.Provider>
    )
}

export const useRegionsStore = () => useContext(RegionsContext);
