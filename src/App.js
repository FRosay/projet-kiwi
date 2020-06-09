import React from 'react';
import './App.css';

import ResourcesView from './components/resource/resources-view.js'
import Tabs from './components/tabs/Tabs.js'
import GameInformations from './components/game-informations/GameInformations.js'
import GameText from './components/game-text/GameText.js'

function App() {
  return (
    <div className="App">
      <ResourcesView />
      <Tabs />
      <GameText />
      <GameInformations />
      <footer>Footer de merde</footer>
    </div>
  );
}

export default App;
