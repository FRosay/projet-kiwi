import React from 'react';
import { useOptionsStore } from '../options/options-store.js';
import { usePlayerStore } from '../player/player-store.js';
import './Tabs.css';
import GetImage from '../GraphicResources.js'

const NAMES_TABS = ['📝 Rapport', '🗺️ Carte', '⚙️ Technologie', '🗳️ Politique', '🌙 Fin de cycle', 'Brouillon']

function Tabs() {

  const { stateOfOptions } = useOptionsStore();
  const { playerState, playerDispatch } = usePlayerStore();

  let isDisplayed = [false, false, false, false, false, false]
  isDisplayed[playerState.whichTab] = true
  let isClickable = [true, true, true, false, true, true]
  isClickable[playerState.whichTab] = false

  function buttonsRender(){
    let buttons = []
    for (let i = 0; i < NAMES_TABS.length; i++) {
      buttons.push(<button className={ isDisplayed[i] ? 'is-displayed' : ''} disabled={ isClickable[i] ? false : true } onClick={ () => playerDispatch({ tab: i }) } key={i}>{ NAMES_TABS[i] }</button>);
    }
    return buttons
  }

  if(stateOfOptions.display !== 'full'){
    return (
      <div id='tabs-div'>
        <div>-- Cycle {playerState.turnNumber} --</div>
        <div>{playerState.preoccupationPoints}/{playerState.preoccupationPointsMax} <img alt='preoccupation Point' src={GetImage('preoccupationPoint')}/></div>
        { buttonsRender() }
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default Tabs;
