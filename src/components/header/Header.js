import React from 'react';
import { useOptionsStore } from '../options/options-store.js';
import { useGameTurnStore } from '../game-turn/game-turn-store.js';


function Header() {

  const { stateOfOptions } = useOptionsStore();
  const { gameTurnState } = useGameTurnStore();

  if(stateOfOptions.display !== 'full'){
    let tabName
    switch (gameTurnState.whichTab) {
      case 0:
        tabName = 'RAPPORT'
        break;
      case 1:
        tabName = 'CARTE'
        break;
      case 2:
        tabName = 'TECHNOLOGIE'
        break;
      case 3:
        tabName = 'POLITIQUE'
        break;
      case 4:
        tabName = 'FIN DE CYCLE'
        break;
      case 9:
        tabName = 'OPTIONS'
        break;
      default:
        tabName = 'ERROR'
    }
    return (
      <div id='header-div'>
        <h1>ᨊ {tabName} ᨊ</h1>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default Header;
