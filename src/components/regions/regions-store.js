import React, { createContext, useContext, useReducer } from 'react';

const RegionsContext = createContext();
const NB_ROW = 3;
const NB_COLUMN = 3;
const INIT_COMPACT = init();
const INITIAL_STATE = {
  clicked: [0,0],
  regionIsDiscovered: INIT_COMPACT[0],
  regionType: INIT_COMPACT[1],
  regionName: INIT_COMPACT[2],
  regionZoneMax: INIT_COMPACT[3],
  //
  regionZoneType: INIT_COMPACT[4],
  regionZoneOwnership: INIT_COMPACT[5],
  regionZoneValue: INIT_COMPACT[6],
  regionZoneIsDiscoverd: INIT_COMPACT[7]
};


function init(varName){
  let rID = [[false,true,false], [true,true,true], [false,true,false]]

  let rT = []; let rN = []; let rZM = [];
  for(let i = 0; i < NB_ROW; i++){rT[i] = []; rN[i] = []; rZM[i] = []}

  let rZT = []; for(let i = 0; i < NB_ROW; i++){rZT[i] = []}
  let rZO = []; for(let i = 0; i < NB_ROW; i++){rZO[i] = []}
  let rZV = []; for(let i = 0; i < NB_ROW; i++){rZV[i] = []}
  let rZID = []; for(let i = 0; i < NB_ROW; i++){rZID[i] = []}

  for(let row = 0; row < NB_ROW; row++){
    for(let col = 0; col < NB_COLUMN; col++){
      //rT & rN
      let allRegionsName = ['pineForest', 'pineLake']
      let allObstaclesName = ['sea', 'mountains', 'bridge']
      if((row%2 === 0 && col%2 === 0) || (row%2 === 1 && col%2 === 1)){
        rT[row][col] = 'region'
        rN[row][col] = allRegionsName[parseInt(Math.random()*allRegionsName.length)]
      } else {
        rT[row][col] = 'obstacle'
        rN[row][col] = allObstaclesName[parseInt(Math.random()*allObstaclesName.length)]
      }
      //rZM
      rZM[row][col] = parseInt(Math.random()*7)+6
    }
  }

  return [rID, rT, rN, rZM, rZT, rZO, rZV, rZID]
}


const regionsReducer = (state, action) => {
  let newClicked = state.clicked
  let newRID = state.regionIsDiscovered
  let newRT = []
  for(let row = 0; row < state.regionType.length; row++){
    newRT[row] = state.regionType[row].slice()
  }
  let newRN = []
  for(let row = 0; row < state.regionName.length; row++){
    newRN[row] = state.regionName[row].slice()
  }
  let newRZM = state.regionZoneMax
  let newRZT = state.regionZoneType
  let newRZV = state.regionZoneValue
  let newRZID = state.regionZoneIsDiscoverd

  newClicked = action.key

  return{
    clicked: newClicked,
    regionIsDiscovered: newRID,
    regionType: newRT,
    regionName: newRN,
    regionZoneMax: newRZM,
    regionZoneType: newRZT,
    regionZoneValue: newRZV,
    regionZoneIsDiscoverd: newRZID
  }
}

export const RegionsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(regionsReducer, INITIAL_STATE);

    return (
        <RegionsContext.Provider value= {{ state, dispatch }}>
            { children }
        </RegionsContext.Provider>
    )
}

export const useRegionsStore = () => useContext(RegionsContext);
