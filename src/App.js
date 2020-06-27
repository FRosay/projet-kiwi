import React from 'react';
import './App.css';

import ResourcesView from './components/resource/resources-view.js'
import Tabs from './components/tabs/Tabs.js'
import GameInformations from './components/game-informations/GameInformations.js'
import GameText from './components/game-text/GameText.js'

import { PlayerProvider } from './components/player/player-store.js'
import { RegionsProvider } from './components/regions/regions-store.js'


function App() {

  return (
    <div className="App">
      <PlayerProvider>
        <ResourcesView />
        <Tabs />
        <RegionsProvider>
          <GameText />
          <GameInformations />
        </RegionsProvider>
        <footer>Footer de merde</footer>
      </PlayerProvider>
    </div>
  );
}


export default App;
