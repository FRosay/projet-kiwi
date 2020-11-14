import React, { createContext, useContext, useReducer } from 'react';
import NameGenerator from '../misc-tools/name-generator/NameGenerator.js';
import GetImage from '../GraphicResources.js';

const GameTurnContext = createContext();
const REGIONS_NAMES = ['pineForest', 'pineLake', 'crystalCave', 'deepLake']
const REGIONS_NAMES_FR = ['forêt de pins', 'lac de pins', 'cave de cristal', 'lac profond']
const REGIONS_ARTICLES_FR = ['la', 'le', 'la', 'le']
const ZONES_NAMES = ['food', 'wood', 'stone', 'minerals', 'camp']
const ZONES_NAMES_FR = ['champs', 'forêt', 'rochers', 'minerais', 'camp']
const REGIONS_ZONES_POSSIBILITIES = [
  [1,2],//pineForest (wood+stone)
  [0,1,2,3],//pineLake
  [2,3],//crystalCave
  [0,2]//deepLake
];

const SPECIES = {
  name: ['monkey', 'newtfrog', 'splitgemer', 'nainard'],
  regionsAllowed: [['pineForest', 'pineLake'],
  ['deepLake'],
  ['crystalCave'],
  ['crystalCave']],
  populationBaseQuantity: [100, 75, 15, 30],
  languageRules: [[3,3], [4,4], [5,5], [6,6]],//min, max, title, letter, inPosition
  likingBase: [50, 20, 70, 50],
  likingVar: [15, 5, 10, 25],
  likingTwoSetps: [[40,80], [50,90], [30,70], [40,80]]
}

const INIT_COMPACT = initRegions();
const INITIAL_STATE = {
  technologiesMastered: [],
  technologiesDiscovered: [],
  technologiesToBeDiscovered: ['Bâteau de pêche', 'Outils rudimentaires', 'Armes rudimentaires', 'Agriculture rudimentaire'],
  turnNumber: 0,
  preoccupationPoints: 10,
  preoccupationPointsMax: 10,
  resourcesName: ['food', 'wood', 'stone', 'minerals'],
  resourcesCategory: ['resource', 'resource', 'resource', 'resource'],
  resourcesQuantity: [0,0,0,0],
  resourcesIsUnique: [false, false, false, false],
  whichTab: -1,
  report: [],
  ownSpecies: 'XXX',
  populationQuantity: 0,
  happiness: 0,

  clicked: false,
  subClick: false,
  coordinatesX: INIT_COMPACT[0],
  coordinatesY: INIT_COMPACT[1],
  isUncrossed: INIT_COMPACT[2],
  regionType: INIT_COMPACT[3],
  regionName: INIT_COMPACT[4],
  zoneMax: INIT_COMPACT[5],
  zoneTypes: INIT_COMPACT[6],
  values: INIT_COMPACT[7],
  zoneOwner: INIT_COMPACT[8],
  build: [],
  cross: [],
  explore: [],

  relationsSpecies: [],
  relationsLiking: []
};


////////////////////////////////////////////////////////////////////////////////
// FUNCTION // FUNCTION // FUNCTION // FUNCTION // FUNCTION // FUNCTION //
////////////////////////////////////////////////////////////////////////////////


function initRegions(){
  let iCoordinatesX = [0,0,1,0,-1];
  let iCoordinatesY = [0,1,0,-1,0];
  let iIsUncrossed = [false, true, true, true, true];
  let iType = [];
  let iName = [];
  let iZoneMax = [];
  for(let i = 0; i < 5; i++){
    let z = parseInt(Math.random()*REGIONS_NAMES.length)
    iType[i] = REGIONS_NAMES[z]
    iName[i] = REGIONS_NAMES_FR[z]+' de '+NameGenerator(3, 6)
    iZoneMax[i] = parseInt(Math.random()*7)+6
  }
  let iZoneTypes = [['camp'],[],[],[],[]];
  let iValues = [[],[],[],[],[]];
  let iOwner = [['player'],[],[],[],[]];
  return [iCoordinatesX, iCoordinatesY, iIsUncrossed, iType, iName, iZoneMax, iZoneTypes, iValues, iOwner];
}


////////////////////////////////////////////////////////////////////////////////
// REDUCER // REDUCER // REDUCER // REDUCER // REDUCER // REDUCER // REDUCER //
////////////////////////////////////////////////////////////////////////////////


const gameTurnReducer = (state, action) => {
  let newTechnologiesMastered = state.technologiesMastered.slice()
  let newTechnologiesDiscovered = state.technologiesDiscovered.slice()
  let newTechnologiesToBeDiscovered = state.technologiesToBeDiscovered.slice()
  let newTurnNumber = state.turnNumber
  let newPreoccupationPoints = state.preoccupationPoints
  let newPreoccupationPointsMax = state.preoccupationPointsMax
  let newResourcesName = state.resourcesName.slice()
  let newResourcesCategory = state.resourcesCategory.slice()
  let newResourcesQuantity = state.resourcesQuantity.slice()
  let newResourcesIsUnique = state.resourcesIsUnique.slice()
  let newWhichTab = state.whichTab
  let newReport = state.report
  let newOwnSpecies = state.ownSpecies
  let newPopulationQuantity = state.populationQuantity
  let newHappiness = state.happiness
////////////////////////////////////////////////////////////////////////////////
  let newClicked = state.clicked
  let newSubClick = state.subClick
  let newCoordinatesX = state.coordinatesX.slice()
  let newCoordinatesY = state.coordinatesY.slice()
  let newIsUncrossed = state.isUncrossed.slice()
  let newRegionType = state.regionType.slice()
  let newRegionName = state.regionName.slice()
  let newZoneMax = state.zoneMax.slice()
  let newZoneTypes = []
  for(let row = 0; row < state.zoneTypes.length; row++){
    newZoneTypes[row] = state.zoneTypes[row].slice()
  }
  let newValues = state.values.slice()
  let newZoneOwner = []
  for(let row = 0; row < state.zoneOwner.length; row++){
    newZoneOwner[row] = state.zoneOwner[row].slice()
  }

  let newBuild = state.build.slice()
  let newCross = state.cross.slice()
  let newExplore = state.explore.slice()

  let newRelationsSpecies = state.relationsSpecies.slice()
  let newRelationsLiking = state.relationsLiking.slice()
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  if (action.category === 'tabs' && Number.isInteger(action.value)) {
    newWhichTab = action.value
  } else if (action.category === 'informations' && typeof action.click !== 'undefined' && action.click !== null) {
    newClicked = action.click
    newSubClick = action.subClick
  } else if (action.category === 'player') {
    switch (action.type) {
      case 'addPoints':
        newPreoccupationPoints += action.range
        break;

      case 'removePoints':
        newPreoccupationPoints -= action.range
        break;

      case 'resetPoints':
        newPreoccupationPoints = newPreoccupationPointsMax
        break;

      case 'setRes':
        newResourcesQuantity[action.index] = action.value
        break;

      case 'increaseRes':
        newResourcesQuantity[action.index] += action.range
        break;

      case 'decreaseRes':
        newResourcesQuantity[action.index] -= action.range
        break;

      case 'setOwnSpecies':
        newOwnSpecies = action.value
        let posOS = SPECIES.name.indexOf(action.value)
        newRegionName[0] = 'Base de '+NameGenerator(
          SPECIES.languageRules[posOS][0],SPECIES.languageRules[posOS][1]
        )
        break;

      case 'setPopulationQuantity':
        newPopulationQuantity = action.range
        break;

      case 'setHappiness':
        newHappiness = action.range
        break;

      case 'setStartingRegion':
        newRegionType[0] = action.value
        break;

      default:
        throw new Error(`Unhandled player action type: ${action.type}`);
      }
  } else if (action.category === 'regions') {
    switch (action.type) {
      case 'cross':
      newPreoccupationPoints -= action.cost
      newCross.push(newClicked)
      break;

      case 'explore':
      newPreoccupationPoints -= action.cost
      newExplore.push(newClicked)
      break;

      default:
        throw new Error(`Unhandled regions action type: ${action.type}`);
    }
  } else if (action.category === 'technologies') {
    let splicedTech = ''
    switch (action.type) {
      case 'addToBeDiscoveredTech':
        newTechnologiesToBeDiscovered.push(action.newTech)
        break;

      case 'addDiscoveredTech':
        newTechnologiesDiscovered.push(action.newTech)
        newTechnologiesToBeDiscovered.splice(newTechnologiesToBeDiscovered.indexOf(action.newTech.techName), 1)
        break;

      case 'addRandomDiscoveredTech':
        splicedTech = newTechnologiesToBeDiscovered.splice(action.rng, 1)
        newTechnologiesDiscovered.push(splicedTech[0])
      break;

      case 'addMasteredTech':
        newTechnologiesMastered.push(action.newTech)
        newTechnologiesDiscovered.splice(newTechnologiesDiscovered.indexOf(action.newTech), 1)
        break;

      case 'addRandomMasteredTech':
        splicedTech = newTechnologiesDiscovered.splice(action.rng, 1)
        newTechnologiesMastered.push(splicedTech[0])
      break;

      default:
        throw new Error(`Unhandled technologies action type: ${action.type}`);
      }

  } else if (action.category === 'build'){
    switch (action.type) {
      case 'camp':
        newPreoccupationPoints --
        //loose resource
        if(ZONES_NAMES.indexOf(newZoneTypes[action.click][action.subClick]) !== -1 && ZONES_NAMES.indexOf(newZoneTypes[action.click][action.subClick]) < 4){
          newResourcesQuantity[ZONES_NAMES.indexOf(newZoneTypes[action.click][action.subClick])] --
        }
        newZoneTypes[action.click][action.subClick] = 'workInProgress'
        newBuild.push([action.click, action.subClick, 'camp'])
        break;
      default:
        throw new Error(`Unhandled build action type: ${action.type}`);
    }
  } else if (action.category === 'endTurn') {
    newTurnNumber ++
    newPreoccupationPoints = state.preoccupationPointsMax
    newWhichTab = 0
    newReport = []

    ////////////////////////////////////////////////////////////////////////////
    //                                  MAP                                   //
    ////////////////////////////////////////////////////////////////////////////

    // BUILD //
    for(let i = 0; i < newBuild.length; i++){
      newZoneTypes[newBuild[i][0]][newBuild[i][1]] = newBuild[i][2]
      newReport.push(<span><span role="img" aria-label="hammer-pick">⚒️</span> Nous avons construit dans {REGIONS_ARTICLES_FR[REGIONS_NAMES.indexOf(newRegionType[newBuild[i][0]])]} <u>{newRegionName[newBuild[i][0]]}</u> : notre <u>{ZONES_NAMES_FR[ZONES_NAMES.indexOf(newBuild[i][2])]}</u> !</span>)
    }
    newBuild = []

    // CROSS //
    for(let i = 0; i < newCross.length; i++){
      //Mark this region as crossed
      newIsUncrossed[newCross[i]] = false
      //Check where regions exists
      let coordinatesExistRegion = []
      for(let j = 0; j < newRegionName.length; j++){
        if (newCoordinatesX[newCross[i]] === newCoordinatesX[j] && newCoordinatesY[newCross[i]]+1 === newCoordinatesY[j]){//haut existe
          coordinatesExistRegion.push('haut existe')
        } else if (newCoordinatesX[newCross[i]] === newCoordinatesX[j] && newCoordinatesY[newCross[i]]-1 === newCoordinatesY[j]){//bas existe
          coordinatesExistRegion.push('bas existe')
        } else if (newCoordinatesX[newCross[i]]-1 === newCoordinatesX[j] && newCoordinatesY[newCross[i]] === newCoordinatesY[j]){//gauche existe
          coordinatesExistRegion.push('gauche existe')
        } else if (newCoordinatesX[newCross[i]]+1 === newCoordinatesX[j] && newCoordinatesY[newCross[i]] === newCoordinatesY[j]){//droite existe
          coordinatesExistRegion.push('droite existe')
        }
      }
      //Put coordinates to new regions to create
      let coordinatesNewRegion = []
      if(coordinatesExistRegion.indexOf('haut existe') === -1){//haut n'existe pas
        coordinatesNewRegion.push([newCoordinatesX[newCross[i]],newCoordinatesY[newCross[i]]+1])
      }
      if(coordinatesExistRegion.indexOf('bas existe') === -1){//bas n'existe pas
        coordinatesNewRegion.push([newCoordinatesX[newCross[i]],newCoordinatesY[newCross[i]]-1])
      }
      if(coordinatesExistRegion.indexOf('gauche existe') === -1){//gauche n'existe pas
        coordinatesNewRegion.push([newCoordinatesX[newCross[i]]-1,newCoordinatesY[newCross[i]]])
      }
      if(coordinatesExistRegion.indexOf('droite existe') === -1){//droite n'existe pas
        coordinatesNewRegion.push([newCoordinatesX[newCross[i]]+1,newCoordinatesY[newCross[i]]])
      }
      //Create new regions
      let allRegionsDiscovered = []
      for(let j = 0; j < coordinatesNewRegion.length; j++){
        //console.log(coordinatesNewRegion[j])
        newCoordinatesX.push(coordinatesNewRegion[j][0])
        newCoordinatesY.push(coordinatesNewRegion[j][1])
        newIsUncrossed.push(true)
        let z = parseInt(Math.random()*REGIONS_NAMES.length)
        newRegionType.push(REGIONS_NAMES[z])
        newRegionName.push(REGIONS_NAMES_FR[z]+' de '+NameGenerator(3, 6))
        newZoneMax.push(parseInt(Math.random()*7)+6)
        newZoneTypes.push([])
        newValues.push([])
        newZoneOwner.push([])
        allRegionsDiscovered.push(<span key={j}> {REGIONS_ARTICLES_FR[REGIONS_NAMES.indexOf(newRegionType[newRegionType.length-1])]} <u>{newRegionName[newRegionName.length-1]}</u>{coordinatesNewRegion.length >= 2 && j === coordinatesNewRegion.length-2 ? ', et' : j < coordinatesNewRegion.length-2 ? ', ' : ''}</span>)
        if(j === coordinatesNewRegion.length-1){//last one
          newReport.push(<span><span role="img" aria-label="crossing">🚸</span> En traversant {REGIONS_ARTICLES_FR[REGIONS_NAMES.indexOf(newRegionType[newCross[i]])]} <u>{newRegionName[newCross[i]]}</u>, nous avons découvert : {allRegionsDiscovered} !</span>)
        }
      }
      if(allRegionsDiscovered.length === 0){//rare cas où le joueur visite autour et donc toutes les régions autours sont découvertes
        newReport.push(<span><span role="img" aria-label="crossing">🚸</span> Après avoir visité tout autour, nous sommes enfin entré dans {REGIONS_ARTICLES_FR[REGIONS_NAMES.indexOf(newRegionType[newCross[i]])]} <u>{newRegionName[newCross[i]]}</u> !</span>)
      }
    }
    newCross = []

    // EXPLORE //
    for(let i = 0; i < newExplore.length; i++){
      let regionNamePosition = REGIONS_NAMES.indexOf(newRegionType[newExplore[i]])
      let zoneTypePosition = REGIONS_ZONES_POSSIBILITIES[regionNamePosition][parseInt(Math.random()*REGIONS_ZONES_POSSIBILITIES[regionNamePosition].length)]
      if(newZoneTypes[newExplore[i]].length < newZoneMax[newExplore[i]]){
        newZoneTypes[newExplore[i]].push(ZONES_NAMES[zoneTypePosition]);
        let randomOwner = Math.random()
        if(newExplore[i] === 0){//explore first spot
          randomOwner = 0
        }
        //
        let randomOwnerText
        let rawDistance = newCoordinatesX[newExplore[i]]+newCoordinatesY[newExplore[i]]
        let formula = 1-(rawDistance*3)/10
        if (randomOwner < formula) {
          newResourcesQuantity[zoneTypePosition]++
          newZoneOwner[newExplore[i]].push('player')
          randomOwnerText = 'disponible'
        } else {
          let speciesAllowed = []
          for(let j = 0; j < SPECIES.regionsAllowed.length; j++){
            if(SPECIES.regionsAllowed[j].indexOf(newRegionType[newExplore[i]]) !== -1){
              speciesAllowed.push(j)
            }
          }
          let randSpAllowed = parseInt(Math.random()*speciesAllowed.length)
          newZoneOwner[newExplore[i]].push(SPECIES.name[speciesAllowed[randSpAllowed]])
          randomOwnerText = 'sous l\'emprise d\'un ' +SPECIES.name[speciesAllowed[randSpAllowed]]
          if(newRelationsSpecies.indexOf(SPECIES.name[speciesAllowed[randSpAllowed]]) === -1){
            newRelationsSpecies.push(SPECIES.name[speciesAllowed[randSpAllowed]])
            newRelationsLiking.push(SPECIES.likingBase[speciesAllowed[randSpAllowed]])
          }
        }
        newReport.push(<span><span role="img" aria-label="compass">🧭</span> En explorant {REGIONS_ARTICLES_FR[REGIONS_NAMES.indexOf(newRegionType[newExplore[i]])]} <u>{newRegionName[newExplore[i]]}</u>, nous sommes tombés sur un ensemble de {ZONES_NAMES_FR[zoneTypePosition]} <img alt={'['+ZONES_NAMES[zoneTypePosition]+']'} src={GetImage(ZONES_NAMES[zoneTypePosition])}/> <u>{randomOwnerText}</u> !</span>)
      } else {
        newReport.push(<span><span role="img" aria-label="compass">🧭</span> Nous n'avons rien trouvé de plus à explorer au niveau de <u>{newRegionName[newExplore[i]]}</u>.</span>)
        //retirer dans newExplore la valeur actuelle pour ne pas avoir de doublon
        let j = i+1 //les prochains seulement
        while (j < newExplore.length) {
          if (newExplore[j] === newExplore[i]) {
            newExplore.splice(j, 1)
          } else {
            j++
          }
        }
        //
      }
    }
    newExplore = []

    ////////////////////////////////////////////////////////////////////////////
    //                              TECHNOLOGIES                              //
    ////////////////////////////////////////////////////////////////////////////

  } else {
    //throw new Error(`Unhandled action type: ${action.actegorie}`);
  }
////////////////////////////////////////////////////////////////////////////////

  return {
    technologiesMastered: newTechnologiesMastered,
    technologiesDiscovered: newTechnologiesDiscovered,
    technologiesToBeDiscovered: newTechnologiesToBeDiscovered,
    turnNumber: newTurnNumber,
    preoccupationPoints: newPreoccupationPoints,
    preoccupationPointsMax: newPreoccupationPointsMax,
    resourcesName: newResourcesName,
    resourcesCategory: newResourcesCategory,
    resourcesQuantity: newResourcesQuantity,
    resourcesIsUnique: newResourcesIsUnique,
    whichTab: newWhichTab,
    report: newReport,
    ownSpecies: newOwnSpecies,
    populationQuantity: newPopulationQuantity,
    happiness: newHappiness,

    clicked: newClicked,
    subClick: newSubClick,
    coordinatesX: newCoordinatesX,
    coordinatesY: newCoordinatesY,
    isUncrossed: newIsUncrossed,
    regionType: newRegionType,
    regionName: newRegionName,
    zoneMax: newZoneMax,
    zoneTypes: newZoneTypes,
    values: newValues,
    zoneOwner: newZoneOwner,

    build: newBuild,
    cross: newCross,
    explore: newExplore,

    relationsSpecies: newRelationsSpecies,
    relationsLiking: newRelationsLiking
  }
}

export const GameTurnProvider = ({ children }) => {
    const [gameTurnState, gameTurnDispatch] = useReducer(gameTurnReducer, INITIAL_STATE);

    return (
        <GameTurnContext.Provider value= {{ gameTurnState, gameTurnDispatch }}>
            { children }
        </GameTurnContext.Provider>
    )
}

export const useGameTurnStore = () => useContext(GameTurnContext);

export {REGIONS_NAMES as REGIONS_NAMES_GTS, SPECIES as SPECIES_GTS};
