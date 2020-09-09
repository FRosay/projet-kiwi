import React, { createContext, useContext, useReducer } from 'react';
//import { useRegionsStore } from '../regions/regions-store.js';
//const { stateOfRegions, dispatchInRegions } = useRegionsStore();

const GameTurnContext = createContext();
const INITIAL_STATE = {
  cross: [3],
  explore: [3]
};

const gameTurnReducer = (state, action) => {
  let newCross = state.cross.slice()
  let newExplore = state.explore.slice()

  if (action.type === 'execute') {
    //cross
    for(let i = 0; i < newCross.length; i++){
      //dispatchInRegions({ type:'cross', value:newExplore[i] })
    }
    //explore
    for(let i = 0; i < newExplore.length; i++){
      //dispatchInRegions({ type:'explore', value:newExplore[i] })
    }
  } else if (action.type === 'cross'){
    newCross.push(action.value)
  } else if (action.type === 'explore'){
    //playerDispatch({ type:'explore' })
    newExplore.push(action.value)
  } else {
    throw new Error(`Unhandled action type: ${action.type}`);
  }

  return {
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
