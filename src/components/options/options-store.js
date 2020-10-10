import React, { createContext, useContext, useReducer } from 'react';

const OptionsContext = createContext();
const INITIAL_STATE = {
  display: 'full',
  hightlightColor: 'orange',
  playerColor: 'blue',
  allyColor: 'lime',
  enemyColor: 'red',
  neutralColor: 'black'
};

const OptionsReducer = (state, action) => {
  let newDisplay = state.display
  let newHightlightColor = state.hightlightColor
  let newPlayerColor = state.playerColor
  let newAllyColor = state.allyColor
  let newEnemyColor = state.enemyColor
  let newNeutralColor = state.neutralColor

  if(action.category === 'display'){
    newDisplay = action.value
  } else if (action.values) {
    newHightlightColor = action.values['hightlightColor']
    newPlayerColor = action.values['playerColor']
    newAllyColor = action.values['allyColor']
    newEnemyColor = action.values['enemyColor']
    newNeutralColor = action.values['neutralColor']
  } else {
    throw new Error(`Unhandled options-store: ${action.category}`);
  }

  return{
    display: newDisplay,
    hightlightColor: newHightlightColor,
    playerColor: newPlayerColor,
    allyColor: newAllyColor,
    enemyColor: newEnemyColor,
    neutralColor: newNeutralColor
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
