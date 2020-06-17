import React, { createContext, useContext, useReducer } from 'react';

const PlayerContext = createContext();
const INITIAL_STATE = { preoccupationPoints: 1, preoccupationPointsMax: 5, resources: [{ name: 'bois', type: 'basic', quantity: 1, isUnique: false }, { name: 'pierre', type: 'basic', quantity: 0, isUnique: false }], witchTab: 6 };

const playerReducer = (state, action) => {
    /*let newResources = state.resources
    console.log(newResources[0])
    if (action.resource === 'bois') {
        switch(action.type) {
            case 'increment':
                newResources[0].quantity += 1
                return {
                    preoccupationPoints: state.preoccupationPoints,
                    resources: newResources
                }
            case 'decrement':
                newResources[0].quantity -= 1
                return {
                    preoccupationPoints: state.preoccupationPoints,
                    resources: newResources
                }
            default:
                throw new Error(`Unhandled action type: ${action.type}`);
            }
    } else if (action.resource === 'pierre') {
        switch(action.type) {
            case 'increment':
                newResources[1].quantity += 1
                return {
                    preoccupationPoints: state.preoccupationPoints,
                    resources: newResources
                }
            case 'decrement':
                newResources[1].quantity -= 1
                return {
                    preoccupationPoints: state.preoccupationPoints,
                    resources: newResources
                }
            default:
                throw new Error(`Unhandled action type: ${action.type}`);
            }
    } else if (Number.isInteger(action.tab)) {
        return {
              preoccupationPoints: state.preoccupationPoints,
              resources: newResources,
              witchTab: action.tab
            }
    } else {
        switch(action.type) {
            case 'increment':
                return {
                    preoccupationPoints: state.preoccupationPoints + action.range,
                    resources: state.resources
                }
            case 'decrement':
                return {
                    preoccupationPoints: state.preoccupationPoints - action.range,
                    resources: state.resources
                }
            case 'reset':
                return {
                    preoccupationPoints: 0,
                    resources: state.resources
                }
            default:
                throw new Error(`Unhandled action type: ${action.type}`);
        }
    }*/
    let newPreoccupationPoints = state.preoccupationPoints
    let newPreoccupationPointsMax = state.preoccupationPointsMax
    let newResources = state.resources
    //console.log(newResources)
    let newWitchTab = state.witchTab

    if (action.resource !== undefined){
      if(action.resource === 'bois'){
        if(action.type === 'increment'){
          newResources[0].quantity += action.range
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
   } else {
      throw new Error(`Unhandled action type: ${action.type}`);
    }

    return {
      preoccupationPoints: newPreoccupationPoints,
      preoccupationPointsMax: newPreoccupationPointsMax,
      resources: newResources,
      witchTab: newWitchTab
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
