import React                from 'react';

import Technology           from './Technology.js';
import GetUnlockedTech      from './GetUnlockedTech.js';
import { useGameTurnStore } from '../../game-turn/game-turn-store.js';

function Technologies() {

  const { gameTurnState, gameTurnDispatch } = useGameTurnStore();
  
  let rng = 0
  let unlockedTechs = []
  let masteredTechs = gameTurnState.technologiesMastered
  let discoveredTechs = gameTurnState.technologiesDiscovered
  let toBeDiscoveredTechs = gameTurnState.technologiesToBeDiscovered


  function addDiscoveredTech() {
    if (typeof toBeDiscoveredTechs !== 'undefined' && toBeDiscoveredTechs.length > 0) {
      rng = Math.floor(Math.random() * Math.floor(toBeDiscoveredTechs.length));
      unlockedTechs = GetUnlockedTech(toBeDiscoveredTechs[rng])
      gameTurnDispatch({category: 'technologies', type: 'addRandomDiscoveredTech', rng: rng})
      for (let i=0; i<unlockedTechs.length ;i++) {
        gameTurnDispatch({category: 'technologies', type: 'addToBeDiscoveredTech', newTech: unlockedTechs[i]})
      }
    } else {
      alert('Plus de technologies à découvrir !')
    } 
  }

  function addMasteredTech() {
    if (typeof discoveredTechs !== 'undefined' && discoveredTechs.length > 0) {
      rng = Math.floor(Math.random() * Math.floor(discoveredTechs.length));
      gameTurnDispatch({category: 'technologies', type: 'addRandomMasteredTech', rng: rng})
    } else {
      alert('Pas ou plus de technologies à maîtriser !')
    }
  }

  return (
    <div className='container'>

      <h1>Technologies maîtrisées :</h1>
      <div className='masteredTechs'>
        {masteredTechs.map((techName, index) => {return <Technology key={index} techName={techName} />})}
      </div>

      <h1>Technologies découvertes :</h1>
      <div className='discoveredTechs'>
        {discoveredTechs.map((techName, index) => {return <Technology key={index} techName={techName} />})}
        <button onClick={() => addMasteredTech()}>Maîtriser une technologie aléatoire</button>
      </div>

      <h1>Technologies à découvrir :</h1>
      <div className='toBeDiscoveredTechs'>
        {toBeDiscoveredTechs.map((techName, index) => {return <Technology key={index} techName={techName} />})}
        <button onClick={() => addDiscoveredTech()}>Découvrir une technologie aléatoire</button>
      </div>

    </div>
  )
}

export default Technologies;