import React from 'react';
import './App.css';

import ResourcesView from './components/resource/resources-view.js'
import Tabs from './components/tabs/Tabs.js'
import GameInformations from './components/game-informations/GameInformations.js'
import GameText from './components/game-text/GameText.js'

import { GameTurnProvider } from './components/game-turn/game-turn-store.js'
import { OptionsProvider } from './components/options/options-store.js'


function App() {

  return (
    <div className="App">
    <OptionsProvider>
      <GameTurnProvider>
        <ResourcesView />
        <Tabs />
          <div id='game-text-div'>
            <GameText />
          </div>
          <GameInformations />
        <footer>Footer de merde - Version 0.01</footer>
      </GameTurnProvider>
    </OptionsProvider>
    </div>
  );
}


export default App;
