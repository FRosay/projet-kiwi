import React, { useState } from 'react';
import StartingLocation from './StartingLocation.js'
import Tooltip from '../../misc-tools/tooltip/tooltip.js'
import { useOptionsStore } from '../../options/options-store.js';
import { useGameTurnStore, SPECIES_GTS } from '../../game-turn/game-turn-store.js';

function Introduction() {

    const { dispatchInOptions } = useOptionsStore();
    const { gameTurnDispatch } = useGameTurnStore();

    const [page, setPage] = useState(0)

    const [ownSpeciesChoice, setOwnSpecies] = useState(SPECIES_GTS.name[0])
    const populationQuantityAdvise = [100,75,15,30]
    const happinessAdvise = [80,60,90,65]
    const [regionStartingChoice, setRegionStarting] = useState(SPECIES_GTS.regionsAllowed[0][0])

    let speciesOptions = []
    for(let i = 0; i < SPECIES_GTS.name.length; i++){
      speciesOptions.push(<option onClick={() => setOwnSpecies(SPECIES_GTS.name[i]) & setRegionStarting(SPECIES_GTS.regionsAllowed[i][0])} key={i}>{SPECIES_GTS.name[i]}</option>)
    }
    let regionsOptions = []
    for(let i = 0; i < SPECIES_GTS.regionsAllowed[SPECIES_GTS.name.indexOf(ownSpeciesChoice)].length; i++){
      regionsOptions.push(<option onClick={() => setRegionStarting(SPECIES_GTS.regionsAllowed[SPECIES_GTS.name.indexOf(ownSpeciesChoice)][i])} key={i}>{SPECIES_GTS.regionsAllowed[SPECIES_GTS.name.indexOf(ownSpeciesChoice)][i]}</option>)
    }


    function validateStartingLocation() {
      gameTurnDispatch({ category:'player', type: 'setOwnSpecies', value: ownSpeciesChoice })
      if(document.getElementById('inputPopulationQuantity').value.length === 0){
        document.getElementById('inputPopulationQuantity').value = populationQuantityAdvise[SPECIES_GTS.name.indexOf(ownSpeciesChoice)]
      }
      gameTurnDispatch({ category:'player', type: 'setPopulationQuantity', range:  document.getElementById('inputPopulationQuantity').value })
      if(document.getElementById('inputHappiness').value.length === 0){
        document.getElementById('inputHappiness').value = happinessAdvise[SPECIES_GTS.name.indexOf(ownSpeciesChoice)]
      }
      gameTurnDispatch({ category:'player', type: 'setHappiness', range: document.getElementById('inputHappiness').value })
      gameTurnDispatch({ category:'player', type: 'setStartingRegion', value: regionStartingChoice })
      //
      gameTurnDispatch({ category:'tabs', value: 0 })
      dispatchInOptions({ category: 'display', value: 'framed'})
    }


    switch (page) {
        case 0:
            return(
              <div>
                <h1>Project: KIWI</h1>
                <button onClick={() => setPage(page+1)} disabled>Nouvel atterrissage</button>

                <br /><br />

                <button onClick={() => setPage(-1)}>Custom</button>
              </div>
            )
        case 1:
            return(
                <div>
                    <p>Faille dans le système des moteurs. État critique.</p>

                    <p>Annulation de l’ordre de mission CNP-006. Nouvelle priorité : sauvegarder les vies humaines à bord.</p>

                    <p>Recherche d’un plan de secours. Analyse des planètes les plus proches...
                    Planète habitable détectée. Probabilité de la découverte : 0,0001%.
                    Possibilité d’utiliser une dernière fois la propulsion des moteurs pour placer le vaisseau en orbite descendante rapide.</p>

                    <p>Probabilité de réussite de la manœuvre : 94,33%.<br />
                    Probabilité de survie immédiate des colons : 15,12% par individu.<br />
                    Probabilité d’endommagement de l’IA-Mère : 96,05%.<br />
                    Probabilité de survie à long terme des colons : 0,28%.</p>

                    <p>Recherche d’une solution moins risquée…</p>

                    <p>Probabilité d’établir un contact avec un vaisseau équipé pour les secours : 0%.<br />
                    Probabilité de survie des colons en cas de changement de trajectoire vers un monde habité : 0%.<br />
                    Probabilité de résoudre le dysfonctionnement des machines : 0%.</p>

                    <p>Enclenchement de la poussée vers Planète Inconnue.</p>

                    <br />

                    <button onClick={() => setPage(page+1)}>Suivant</button>
                </div>
            )
        case 2:
            return(
                <div>
                    <p>Planète en approche rapide. Probabilité de survie des colons en baisse.</p>

                    <div>Possibilité d'influer légèrement la trajectoire grâce aux systèmes de <Tooltip tooltip='VIP.' tooltipText='Vol Intra-Planétaires' /></div>

                    <p>Détermination d'un point de chute nécessaire.</p>

                    <p>Analyse rapide de la planète. Points de chute atteignables listés. Avantages respectifs déterminés.</p>

                    <p>Choix du lieu d'arrivée en cours...</p>

                    <br />

                    <button onClick={() => setPage(page+1)}>Suivant</button>
                </div>
            )
        case 3:
            return(
                <div>
                    <p>Caractéristiques du lieu d'atterrissage envisagé :</p> <br />

                    <StartingLocation />
                </div>
            )
        case -1:
          return(
            <div style={{border:"2px solid white"}}><table><tbody>
              <tr><th>Carac</th><th>Valeur</th><th>Conseil</th></tr>
              <tr><td>Espèce</td><td>
              <select>{speciesOptions}</select>
              </td><td>{SPECIES_GTS.name[0]}</td></tr>
              <tr><td>Nombre d'individus</td><td><input id="inputPopulationQuantity" type="number" min="1" max="100"/></td><td>{populationQuantityAdvise[SPECIES_GTS.name.indexOf(ownSpeciesChoice)]}</td></tr>
              <tr><td>Bonheur de départ</td><td><input id="inputHappiness" type="number" min="0" max="100"/></td><td>{happinessAdvise[SPECIES_GTS.name.indexOf(ownSpeciesChoice)]}</td></tr>
              <tr><td>Région de départ</td><td>
              <select>{regionsOptions}</select>
              </td><td>...</td></tr>
            </tbody></table><button onClick={() => validateStartingLocation()}>Valider</button></div>
          )
        default:
            return(
                <div>
                    <p>Erreur dans le numéro de page.</p>
                </div>
            )
    }
}

export default Introduction;
