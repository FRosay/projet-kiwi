import React, { createContext, useContext, useReducer } from 'react';

const PlayerContext = createContext();
const INITIAL_STATE = {
  technologiesMastered: [],
  technologiesDiscovered: [],
  turnNumber: 0,
  preoccupationPoints: 3,
  preoccupationPointsMax: 3,
  resourcesName: ['wood', 'stone', 'minerals', 'food'],
  resourcesCategory: ['resource', 'resource', 'resource', 'resource'],
  resourcesQuantity: [0,0,0,0],
  resourcesIsUnique: [false, false, false, false],
  whichTab: -1
};

const playerReducer = (state, action) => {
  let newTechnologiesMastered = state.technologiesMastered.slice()
  let newTechnologiesDiscovered = state.technologiesDiscovered.slice()
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
  } else {
    switch (action.type) {
      case 'addDiscoveredTech':
        newTechnologiesDiscovered.push(action.newTech)
        break;
      case 'addMasteredTech':
        newTechnologiesMastered.push(action.newTech)
        break;
      case 'endTurn':
        newTurnNumber ++
        newPreoccupationPoints = state.preoccupationPointsMax
        newWhichTab = 0
        break;
      case 'addPoints':
        newPreoccupationPoints += action.range
        break;
      case 'removePoints':
        newPreoccupationPoints -= action.range
        break;
      case 'resetPoints':
        newPreoccupationPoints = newPreoccupationPointsMax
        break;
      case 'setRes':
        newResourcesQuantity[action.index] = action.value
        break;
      case 'increaseRes':
        newResourcesQuantity[action.index] += action.range
        break;
      case 'decreaseRes':
        newResourcesQuantity[action.index] -= action.range
        break;
      case 'explore':
        newPreoccupationPoints --
        break;
      case 'cross':
        newPreoccupationPoints --
        break;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  return {
    technologiesMastered: newTechnologiesMastered,
    technologiesDiscovered: newTechnologiesDiscovered,
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
    const [playerState, playerDispatch] = useReducer(playerReducer, INITIAL_STATE);

    return (
        <PlayerContext.Provider value= {{ playerState, playerDispatch }}>
            { children }
        </PlayerContext.Provider>
    )
}

export const usePlayerStore = () => useContext(PlayerContext);
