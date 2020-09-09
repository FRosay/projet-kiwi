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
  values: INIT_COMPACT[7]
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


const regionsReducer = (state, action) => {
  let newClicked = state.clicked

  let newCX = state.coordinatesX
  let newCY = state.coordinatesY
  let newIO = state.isObstacle
  let newT = state.type
  let newN = state.name
  let newZM = state.zoneMax
  let newZT = []
  for(let row = 0; row < state.zoneTypes.length; row++){
    newZT[row] = state.zoneTypes[row].slice()
  }
  let newV = state.values

  if(action.type === 'cross'){
    console.log("crosss")
  } else if(action.type === 'explore'){
    console.log("xplor")
  }
  if (typeof action.click !== 'undefined' && action.click !== null) {
    newClicked = action.click
  }

  return{
    clicked: newClicked,
    coordinatesX: newCX,
    coordinatesY: newCY,
    isObstacle: newIO,
    type: newT,
    name: newN,
    zoneMax: newZM,
    zoneTypes: newZT,
    values: newV
  }
}

export const RegionsProvider = ({ children }) => {
    const [stateOfRegions, dispatchInRegions] = useReducer(regionsReducer, INITIAL_STATE);

    return (
        <RegionsContext.Provider value= {{ stateOfRegions, dispatchInRegions }}>
            { children }
        </RegionsContext.Provider>
    )
}

export const useRegionsStore = () => useContext(RegionsContext);
