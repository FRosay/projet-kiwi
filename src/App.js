import React from 'react';
import './App.css';

import ResourcesView from './components/resource/resources-view.js'
import Tabs from './components/tabs/Tabs.js'
import GameInformations from './components/game-informations/GameInformations.js'
import GameText from './components/game-text/GameText.js'

import { GameTurnProvider } from './components/game-turn/game-turn-store.js'
import { OptionsProvider } from './components/options/options-store.js'
import { PlayerProvider } from './components/player/player-store.js'
import { RegionsProvider } from './components/regions/regions-store.js'


function App() {

  return (
    <div className="App">
    <OptionsProvider>
      <GameTurnProvider>
      <PlayerProvider>
        <ResourcesView />
        <Tabs />
        <RegionsProvider>
          <div id='game-text-div'>
            <GameText />
          </div>
          <GameInformations />
        </RegionsProvider>
        <footer>Footer de merde</footer>
      </PlayerProvider>
      </GameTurnProvider>
    </OptionsProvider>
    </div>
  );
}


export default App;
