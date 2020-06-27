import React from 'react';
import { usePlayerStore } from '../player/player-store.js';
import './Tabs.css';

const NAMES_TABS = ['Rapport', 'Carte', 'Technologie', 'Politique', 'Fin de cycle', 'Cheat', 'Brouillon']

function Tabs() {

  const { state, dispatch } = usePlayerStore();

  let isDisplayed = [false, false, false, false, false, false, false]
  isDisplayed[state.whichTab] = true
  let isClickable = [true, true, true, false, true, true, true]

  function buttonsRender(){
    let buttons = []
    for (let i = 0; i < NAMES_TABS.length; i++) {
      buttons.push(<button className={ isDisplayed[i] ? 'is-displayed' : ''} disabled={ isClickable[i] ? false : true }  onClick={ () => dispatch({ tab: i }) } key={i}>{ NAMES_TABS[i] }</button>);
    }
    return buttons
  }

  return (
    <div id='tabs-div'>
      { buttonsRender() }
    </div>
  )
}

export default Tabs;
