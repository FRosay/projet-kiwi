import React, { createContext, useContext, useReducer } from 'react';

const PlayerContext = createContext();
const initialState = { preoccupationPoints: 1, resources: [{ name: 'bois', type: 'basic', quantity: 1, isUnique: false }, { name: 'pierre', type: 'basic', quantity: 0, isUnique: false }] };

const playerReducer = (state, action) => {
    let newResources = state.resources
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
    }
}

export const PlayerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(playerReducer, initialState);

    return (
        <PlayerContext.Provider value= {{ state, dispatch }}>
            { children }
        </PlayerContext.Provider>
    )
}

export const usePlayerStore = () => useContext(PlayerContext);