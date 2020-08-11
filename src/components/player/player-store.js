import React, { createContext, useContext, useReducer } from 'react';

const PlayerContext = createContext();
const INITIAL_STATE = {
  cross: [],
  exploration: [],
  turnNumber: 0,
  preoccupationPoints: 3,
  preoccupationPointsMax: 5,
  resourcesName: ['wood', 'stone'],
  resourcesCategory: ['resource', 'resource'],
  resourcesQuantity: [0,0],
  resourcesIsUnique: [false, false],
  whichTab: 5 };

const playerReducer = (state, action) => {
  let newCross = state.cross.slice()
  let newExploration = state.exploration.slice()
  let newTurnNumber = state.turnNumber
  let newPreoccupationPoints = state.preoccupationPoints
  let newPreoccupationPointsMax = state.preoccupationPointsMax
  let newResourcesName = state.resourcesName.slice()
  let newResourcesCategory = state.resourcesCategory.slice()
  let newResourcesQuantity = state.resourcesQuantity.slice()
  let newResourcesIsUnique = state.resourcesIsUnique.slice()
  let newWhichTab = state.whichTab

  if (Number.isInteger(action.tab)) {
    newWhichTab = action.tab
  } else if (action.type === 'endTurn') {
    newTurnNumber ++
    newPreoccupationPoints = state.preoccupationPointsMax
    newExploration = []
    newCross = []
    newWhichTab = 0
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
 } else if (action.type === 'exploration') {
   newExploration.push(action.value)
   newPreoccupationPoints --
 } else if (action.type === 'cross') {
   newCross.push(action.value)
   newPreoccupationPoints --
 } else {
    throw new Error(`Unhandled action type: ${action.type}`);
  }
  return {
    cross: newCross,
    exploration: newExploration,
    turnNumber: newTurnNumber,
    preoccupationPoints: newPreoccupationPoints,
    preoccupationPointsMax: newPreoccupationPointsMax,
    resourcesName: newResourcesName,
    resourcesCategory: newResourcesCategory,
    resourcesQuantity: newResourcesQuantity,
    resourcesIsUnique: newResourcesIsUnique,
    whichTab: newWhichTab
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
