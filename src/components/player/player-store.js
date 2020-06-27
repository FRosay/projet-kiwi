import React, { createContext, useContext, useReducer } from 'react';

const PlayerContext = createContext();
const INITIAL_STATE = {
  turnNumber: 0,
  preoccupationPoints: 3,
  preoccupationPointsMax: 5,
  resourcesName: ['wood', 'stone'],
  resourcesCategory: ['resource', 'resource'],
  resourcesQuantity: [0,0],
  resourcesIsUnique: [false, false],
  whichTab: 6 };

const playerReducer = (state, action) => {
  let newTurnNumber = state.turnNumber
  let newPreoccupationPoints = state.preoccupationPoints
  let newPreoccupationPointsMax = state.preoccupationPointsMax
  let newResourcesName = state.resourcesName.slice()
  let newResourcesCategory = state.resourcesCategory.slice()
  let newResourcesQuantity = state.resourcesQuantity.slice()
  let newResourcesIsUnique = state.resourcesIsUnique.slice()
  let newWitchTab = state.whichTab

  if (Number.isInteger(action.tab)) {
    newWitchTab = action.tab
  } else if (action.type === 'endTurn') {
    newTurnNumber ++
    newPreoccupationPoints = state.preoccupationPointsMax
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
  return {
    turnNumber: newTurnNumber,
    preoccupationPoints: newPreoccupationPoints,
    preoccupationPointsMax: newPreoccupationPointsMax,
    resourcesName: newResourcesName,
    resourcesCategory: newResourcesCategory,
    resourcesQuantity: newResourcesQuantity,
    resourcesIsUnique: newResourcesIsUnique,
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
