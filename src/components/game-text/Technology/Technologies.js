import React from 'react';

import Technology from './Technology.js';
import GetTechInfos from './GetTechInfos.js';
import { useGameTurnStore } from '../../game-turn/game-turn-store.js';

function Technologies() {

  const { gameTurnState, gameTurnDispatch } = useGameTurnStore();

  let masteredTechs = gameTurnState.technologiesMastered
  let discoveredTechs = gameTurnState.technologiesDiscovered

  let newTech = GetTechInfos('Random')

  function addDiscoveredTech() {
    gameTurnDispatch({category:'technologies', type: 'addDiscoveredTech', newTech: newTech})
    //newTech = GetTechInfos('Random')
  }

  return (
    <div className='container'>

        Technologies maîtrisées :
      <div className='masteredTechs'>
        { masteredTechs.map((tech, index) => { return <Technology key= {index} techImage= {tech.techImage} techName= {tech.techName} techGroup= {tech.techGroup} techCost= {tech.techCost} /> }) }
      </div>

        Technologies découvertes :
      <div className='discoveredTechs'>
        { discoveredTechs.map((tech, index) => { return <Technology key= {index} techImage= {tech.techImage} techName= {tech.techName} techGroup= {tech.techGroup} techCost= {tech.techCost} /> }) }
      </div>

        Technologies à découvrir :
      <div className='toBeDiscoveredTechs'>
        <button onClick={() => addDiscoveredTech()}>Découvrir une technologie aléatoire</button>
      </div>

    </div>
  )
}

export default Technologies;
