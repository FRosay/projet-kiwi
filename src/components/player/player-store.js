import React, { createContext, useContext, useReducer } from 'react';

const PlayerContext = createContext();
const initialState = { preoccupationPoints: 1 };

const playerReducer = (state, action) => {
    switch(action.type) {
        case 'increment':
            return {
                preoccupationPoints: state.preoccupationPoints + action.range
            }
        case 'decrement':
            return {
                preoccupationPoints: state.preoccupationPoints - action.range
            }
            case 'reset':
            return {
                preoccupationPoints: 0
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
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