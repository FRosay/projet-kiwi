import React, { createContext, useContext, useReducer } from 'react';

const OptionsContext = createContext();
const INITIAL_STATE = {
  display: 'full',
  hightlightColor: 'orange',//example
  playerColor: 'purple',
  allyColor: 'pink',
  enemyColor: 'red'
};

const OptionsReducer = (state, action) => {
  let newDisplay = state.display
  let newHightlightColor = state.hightlightColor
  let newPlayerColor = state.playerColor
  let newAllyColor = state.allyColor
  let newEnemyColor = state.enemyColor

  if(action.category === 'display'){
    newDisplay = action.value
  } else if (action.values) {
    newHightlightColor = action.values['hightlightColor']
    newPlayerColor = action.values['playerColor']
    newAllyColor = action.values['allyColor']
    newEnemyColor = action.values['enemyColor']
  } else {
    throw new Error(`Unhandled options-store: ${action.category}`);
  }

  return{
    display: newDisplay,
    hightlightColor: newHightlightColor,
    playerColor: newPlayerColor,
    allyColor: newAllyColor,
    enemyColor: newEnemyColor
  }
}

export const OptionsProvider = ({ children }) => {
    const [stateOfOptions, dispatchInOptions] = useReducer(OptionsReducer, INITIAL_STATE);

    return (
        <OptionsContext.Provider value= {{ stateOfOptions, dispatchInOptions }}>
            { children }
        </OptionsContext.Provider>
    )
}

export const useOptionsStore = () => useContext(OptionsContext);
