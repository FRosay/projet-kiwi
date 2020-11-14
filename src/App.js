import React from 'react';
import './App.css';

import ResourcesView from './components/resource/resources-view.js'
import Tabs from './components/tabs/Tabs.js'
import GameInformations from './components/game-informations/GameInformations.js'
import GameText from './components/game-text/GameText.js'
import OwnPopulation from './components/own-population/OwnPopulation.js'
import Meter from './components/meter/Meter.js'
import Header from './components/header/Header.js'

import { GameTurnProvider } from './components/game-turn/game-turn-store.js'
import { OptionsProvider } from './components/options/options-store.js'


function App() {
  let topHeight = '20%'
  let middleHeight = '70%'
  let bottomHeight = '10%'
  let pannelWidth = '25%'
  let centerWidth = '50%'
  return (
    <div className="App">
    <OptionsProvider>
      <GameTurnProvider>
        <div style={{height:topHeight, width:pannelWidth}}><Meter /></div>
        <div style={{height:middleHeight, width:pannelWidth}}><Tabs /></div>
        <div style={{height:bottomHeight, width:pannelWidth}}>BOTTOM-LEFT</div>

        <div style={{height:topHeight, width:centerWidth}}><Header /></div>
        <div id='game-text-div' style={{height:middleHeight, width:centerWidth}}><GameText /></div>
        <footer style={{height:bottomHeight, width:centerWidth}}>Footer de merde - Version 0.04 : not alone</footer>

        <div style={{height:topHeight, width:pannelWidth}}><ResourcesView /></div>
        <div style={{height:middleHeight, width:pannelWidth}}><GameInformations /></div>
        <div style={{height:bottomHeight, width:pannelWidth}}><OwnPopulation /></div>
      </GameTurnProvider>
    </OptionsProvider>
    </div>
  );
}


export default App;
