import React from 'react';
import './App.css';

import Resources from './components/resources/Resources.js'
import Tabs from './components/tabs/Tabs.js'
import GameInformations from './components/game-informations/GameInformations.js'
import GameText from './components/game-text/GameText.js'

function App() {
  return (
    <div className="App">
      {/*}<header className="App-header">
      </header>*/}
      <Resources />
      <Tabs />
      <GameInformations />
      <GameText />
      <footer>Footer de merde</footer>
    </div>
  );
}

export default App;
