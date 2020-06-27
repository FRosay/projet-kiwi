import React, { createContext, useContext, useReducer } from 'react';

const RegionsContext = createContext();
const NB_ROW = 3;
const NB_COLUMN = 3;
const INIT_COMPACT = init();
const INITIAL_STATE = {
  clicked: [0,0],
  regionIsDiscovered: INIT_COMPACT[0],
  regionType: INIT_COMPACT[1],
  regionZoneMax: INIT_COMPACT[2],
  //
  regionZoneType: INIT_COMPACT[3],
  regionZoneOwnership: INIT_COMPACT[4],
  regionZoneValue: INIT_COMPACT[5],
  regionZoneIsDiscoverd: INIT_COMPACT[6]
};


function init(varName){
  let rID = [[false,true,false], [true,true,true], [false,true,false]]

  let rT = []; let rZM = [];
  for(let i = 0; i < NB_ROW; i++){rT[i] = []; rZM[i] = []}

  let rZT = []; for(let i = 0; i < NB_ROW; i++){rZT[i] = []}
  let rZO = []; for(let i = 0; i < NB_ROW; i++){rZO[i] = []}
  let rZV = []; for(let i = 0; i < NB_ROW; i++){rZV[i] = []}
  let rZID = []; for(let i = 0; i < NB_ROW; i++){rZID[i] = []}

  for(let row = 0; row < NB_ROW; row++){
    for(let col = 0; col < NB_COLUMN; col++){
      //rIO
      let allRegionsType = ['region-pineForest', 'region-pineLake']
      if(row%2 === 0 && col%2 === 0){
        rT[row][col] = allRegionsType[parseInt(Math.random()*allRegionsType.length)]
      }
      else if(row%2 === 0 && col%2 === 1){rT[row][col] = 'obstacle'}
      else if(row%2 === 1 && col%2 === 0){rT[row][col] = 'obstacle'}
      else{
        rT[row][col] = allRegionsType[parseInt(Math.random()*allRegionsType.length)]
      }
      //rZM
      rZM[row][col] = parseInt(Math.random()*7)+6
    }
  }

  return [rID, rT, rZM, rZT, rZO, rZV, rZID]
}


const regionsReducer = (state, action) => {
  let newClicked = state.clicked
  let newRID = state.regionIsDiscovered
  let newRT = []
  for(let row = 0; row < state.regionType.length; row++){
    newRT[row] = state.regionType[row].slice()
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
