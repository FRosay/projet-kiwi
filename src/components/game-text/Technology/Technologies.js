import React from 'react';

import Technology from './Technology.js';
import GetTechInfos from './GetTechInfos.js';
import { usePlayerStore } from '../../player/player-store.js';

function Technologies() {

  const { playerState, playerDispatch } = usePlayerStore();

  let masteredTechs = playerState.technologiesMastered
  let discoveredTechs = playerState.technologiesDiscovered
  
  let newTech = GetTechInfos('Canne à pêche')
  console.log(discoveredTechs)
  return (
    <div>
      <p>Technologies maîtrisées :</p>
      
      { masteredTechs.map((tech, index) => { return <Technology key= {index} techName= {tech.techName} techGroup= {tech.techGroup} techCost= {tech.techCost} /> }) }
      
      <p>Technologies découvertes :</p>

      { discoveredTechs.map((tech, index) => { return <Technology key= {index} techName= {tech.techName} techGroup= {tech.techGroup} techCost= {tech.techCost} /> }) }

      <p>Technologies à découvrir :</p>

      <button onClick={() => playerDispatch({type: 'addDiscoveredTech', newTech: newTech})}>Canne à pêche</button>

    </div>
  )
}

export default Technologies;
