import React, { createContext, useContext, useReducer } from 'react';

const RegionsContext = createContext();
const NB_ROW = 3;
const NB_COLUMN = 3;
const INIT_COMPACT = init();
const INITIAL_STATE = {
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
      if(row%2 === 0 && col%2 === 0){rT[row][col] = "region-discovered"}
      else if(row%2 === 0 && col%2 === 1){rT[row][col] = "obstacle"}
      else if(row%2 === 1 && col%2 === 0){rT[row][col] = "obstacle"}
      else{rT[row][col] = "region-discovered"}
      //rZM
      rZM[row][col] = parseInt(Math.random()*7)+6
    }
  }

  return [rID, rT, rZM, rZT, rZO, rZV, rZID]
}


const regionsReducer = (state, action) => {
  //
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
