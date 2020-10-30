import React from 'react';
import { useOptionsStore } from '../options/options-store.js';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';

const NAMES_TABS = ['📝 Rapport', '🗺️ Carte', '⚙️ Technologie', '🗳️ Politique', '🌙 Fin de cycle', 'Brouillon']

function Tabs() {

  const { stateOfOptions } = useOptionsStore();
  const { gameTurnState, gameTurnDispatch } = useGameTurnStore();

  let isDisplayed = [false, false, false, false, false, false]
  isDisplayed[gameTurnState.whichTab] = true
  let isClickable = [true, true, true, false, true, true]
  isClickable[gameTurnState.whichTab] = false

  function buttonsRender(){
    let buttons = []
    for (let i = 0; i < NAMES_TABS.length; i++) {
      buttons.push(<button style={ isDisplayed[i] ? {color:stateOfOptions.hightlightColor} : {color:''}} disabled={ isClickable[i] ? false : true } onClick={ () => gameTurnDispatch({ category:'tabs', value: i }) } key={i}>{ NAMES_TABS[i] }</button>);
    }
    return buttons
  }

  if(stateOfOptions.display !== 'full'){
    return (
      <div id='tabs-div'>
        <div id='options-div' onClick={ () => gameTurnDispatch({ category:'tabs', value: 9 }) }><span role="img" aria-label="wrench">🔧</span></div>

        { buttonsRender() }
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default Tabs;
