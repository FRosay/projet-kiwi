import React, { createContext, useContext, useReducer } from 'react';

const OptionsContext = createContext();
const INITIAL_STATE = {
  display: 'full',
  hightlightColor: 'orange'//example
};

const OptionsReducer = (state, action) => {
  let newDisplay = state.display
  let newHightlightColor = state.hightlightColor

  if(action.category === 'display'){
    newDisplay = action.value
  } else if (action.category === 'hightlightColor') {
    newHightlightColor = action.value
  }

  return{
    display: newDisplay,
    hightlightColor: newHightlightColor
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
