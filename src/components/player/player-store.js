import React, { createContext, useContext, useReducer } from 'react';

const PlayerContext = createContext();
const INITIAL_STATE = { preoccupationPoints: 1, preoccupationPointsMax: 5, resources: [{ name: 'bois', type: 'basic', quantity: 1, isUnique: false }, { name: 'pierre', type: 'basic', quantity: 0, isUnique: false }], whichTab: 6, resourcesQuantity: [0,0] };

const playerReducer = (state, action) => {
    let newPreoccupationPoints = state.preoccupationPoints
    let newPreoccupationPointsMax = state.preoccupationPointsMax
    let newResources = state.resources
    let newResourcesQuantity = []
    for(let i = 0; i < state.resourcesQuantity.length; i++){
      newResourcesQuantity[i] = state.resourcesQuantity[i]
    }
    let newWitchTab = state.whichTab

    if (action.resource !== undefined){
      if(action.resource === 'bois'){
        if(action.type === 'increment'){
          console.log("state-IN-1st: "+state.resources[0].quantity)
          newResources[0].quantity = 0
          console.log("state-IN-2nd: "+state.resources[0].quantity)
          newResources[0].quantity = state.resources[0].quantity + 3
          console.log("nR: "+newResources[0].quantity)
        }else if(action.type === 'decrement'){
          newResources[0].quantity -= action.range
        }else{throw new Error(`Unhandled action type: ${action.type}`);}
      }else if(action.resource === 'pierre'){
        if(action.type === 'increment'){
          newResources[1].quantity += action.range
        }else if(action.type === 'decrement'){
          newResources[1].quantity -= action.range
        }else{throw new Error(`Unhandled action type: ${action.type}`);}
      }
    } else if (Number.isInteger(action.tab)) {
      newWitchTab = action.tab
    } else if (action.type === 'addPoints') {
      newPreoccupationPoints += action.range
    } else if (action.type === 'removePoints') {
      newPreoccupationPoints -= action.range
    } else if (action.type === 'resetPoints') {
     newPreoccupationPoints = newPreoccupationPointsMax
   } else if (action.type === 'increaseRes') {
     newResourcesQuantity[action.index] += action.range
   } else if (action.type === 'decreaseRes') {
     newResourcesQuantity[action.index] -= action.range
   } else {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
console.log("state: "+state.resources[0].quantity)
    return {
      preoccupationPoints: newPreoccupationPoints,
      preoccupationPointsMax: newPreoccupationPointsMax,
      resources: newResources,
      resourcesQuantity: newResourcesQuantity,
      whichTab: newWitchTab
    }
}

export const PlayerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(playerReducer, INITIAL_STATE);

    return (
        <PlayerContext.Provider value= {{ state, dispatch }}>
            { children }
        </PlayerContext.Provider>
    )
}

export const usePlayerStore = () => useContext(PlayerContext);
