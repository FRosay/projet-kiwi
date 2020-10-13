import React, { createContext, useContext, useReducer } from 'react';
import NameGenerator from '../misc-tools/name-generator/NameGenerator.js';
import GetImage from '../GraphicResources.js';

const GameTurnContext = createContext();
const REGIONS_NAMES = ['pineForest', 'pineLake', 'crystalCave', 'deepLake']
const REGIONS_NAMES_FR = ['forêt de pins', 'lac de pins', 'cave de cristal', 'lac profond']
const ZONES_NAMES = ['food', 'wood', 'stone', 'minerals']
const ZONES_NAMES_FR = ['champs', 'forêt', 'rochers', 'minerais']
const REGIONS_ZONES_POSSIBILITIES = [
  [1,2],//pineForest (wood+stone)
  [0,1,2,3],//pineLake
  [2,3],//crystalCave
  [0,2]//deepLake
];
//const OBSTACLES_NAMES = ['sea', 'mountains', 'bridge']
//const OBSTACLES_NAMES_FR = ['mer', 'montagnes', 'pont']
const INIT_COMPACT = initRegions();
const INITIAL_STATE = {
  technologiesMastered: [],
  technologiesDiscovered: [],
  turnNumber: 0,
  preoccupationPoints: 10,
  preoccupationPointsMax: 10,
  resourcesName: ['food', 'wood', 'stone', 'minerals'],
  resourcesCategory: ['resource', 'resource', 'resource', 'resource'],
  resourcesQuantity: [0,0,0,0],
  resourcesIsUnique: [false, false, false, false],
  whichTab: -1,
  report: [],

  clicked: false,
  coordinatesX: INIT_COMPACT[0],
  coordinatesY: INIT_COMPACT[1],
  isUncrossed: INIT_COMPACT[2],
  type: INIT_COMPACT[3],
  name: INIT_COMPACT[4],
  zoneMax: INIT_COMPACT[5],
  zoneTypes: INIT_COMPACT[6],
  values: INIT_COMPACT[7],
  owner: INIT_COMPACT[8],
  cross: [],
  explore: []
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
  let iZoneTypes = [[],[],[],[],[]];
  let iValues = [[],[],[],[],[]];
  let iOwner = [[],['noOne'],['noOne'],['noOne'],['noOne']];
  return [iCoordinatesX, iCoordinatesY, iIsUncrossed, iType, iName, iZoneMax, iZoneTypes, iValues, iOwner];
}


////////////////////////////////////////////////////////////////////////////////
// REDUCER // REDUCER // REDUCER // REDUCER // REDUCER // REDUCER // REDUCER //
////////////////////////////////////////////////////////////////////////////////


const gameTurnReducer = (state, action) => {
  let newTechnologiesMastered = state.technologiesMastered.slice()
  let newTechnologiesDiscovered = state.technologiesDiscovered.slice()
  let newTurnNumber = state.turnNumber
  let newPreoccupationPoints = state.preoccupationPoints
  let newPreoccupationPointsMax = state.preoccupationPointsMax
  let newResourcesName = state.resourcesName.slice()
  let newResourcesCategory = state.resourcesCategory.slice()
  let newResourcesQuantity = state.resourcesQuantity.slice()
  let newResourcesIsUnique = state.resourcesIsUnique.slice()
  let newWhichTab = state.whichTab
  let newReport = state.report
////////////////////////////////////////////////////////////////////////////////
  let newClicked = state.clicked
  let newCoordinatesX = state.coordinatesX.slice()
  let newCoordinatesY = state.coordinatesY.slice()
  let newIsUncrossed = state.isUncrossed.slice()
  let newType = state.type.slice()
  let newName = state.name.slice()
  let newZoneMax = state.zoneMax.slice()
  let newZoneTypes = []
  for(let row = 0; row < state.zoneTypes.length; row++){
    newZoneTypes[row] = state.zoneTypes[row].slice()
  }
  let newValues = state.values.slice()
  let newOwner = []
  for(let row = 0; row < state.owner.length; row++){
    newOwner[row] = state.owner[row].slice()
  }

  let newCross = state.cross.slice()
  let newExplore = state.explore.slice()
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  if (action.category === 'tabs' && Number.isInteger(action.value)) {
    newWhichTab = action.value
  } else if (action.category === 'informations' && typeof action.click !== 'undefined' && action.click !== null) {
    newClicked = action.click
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

      default:
        throw new Error(`Unhandled player action type: ${action.type}`);
      }
  } else if (action.category === 'regions') {
    switch (action.type) {
      case 'cross':
      newPreoccupationPoints --
      newCross.push(newClicked)
      break;

      case 'explore':
      newPreoccupationPoints --
      newExplore.push(newClicked)
      break;

      default:
        throw new Error(`Unhandled regions action type: ${action.type}`);
    }
  } else if (action.category === 'technologies') {
    switch (action.type) {
      case 'addDiscoveredTech':
        newTechnologiesDiscovered.push(action.newTech)
        break;

      case 'addMasteredTech':
        newTechnologiesMastered.push(action.newTech)
        break;

      default:
        throw new Error(`Unhandled technologies action type: ${action.type}`);
      }
  } else if (action.category === 'endTurn') {
    newTurnNumber ++
    newPreoccupationPoints = state.preoccupationPointsMax
    newWhichTab = 0
    newReport = []

    ////////////////////////////////////////////////////////////////////////////
    //                                  MAP                                   //
    ////////////////////////////////////////////////////////////////////////////

    // CROSS //
    for(let i = 0; i < newCross.length; i++){
      //Mark this region as crossed
      newIsUncrossed[newCross[i]] = false
      //Check where regions exists
      let coordinatesExistRegion = []
      for(let j = 0; j < newName.length; j++){
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
      for(let j = 0; j < coordinatesNewRegion.length; j++){
        //console.log(coordinatesNewRegion[j])
        newCoordinatesX.push(coordinatesNewRegion[j][0])
        newCoordinatesY.push(coordinatesNewRegion[j][1])
        newIsUncrossed.push(true)
        let z = parseInt(Math.random()*REGIONS_NAMES.length)
        newType.push(REGIONS_NAMES[z])
        newName.push(REGIONS_NAMES_FR[z]+' de '+NameGenerator(3, 6))
        newZoneMax.push(parseInt(Math.random()*7)+6)
        newZoneTypes.push([])
        newValues.push('')
        newOwner.push(['noOne'])
        newReport.push(<span><span role="img" aria-label="crossing">🚸</span> En traversant <u>{newName[newCross[i]]}</u>, nous avons découvert : <u>{newName[newName.length-1]}</u> !</span>)
      }


      //////////////////////////////////////////////////////////
      /*if (Math.abs(newCoordinatesX[newCross[i]]%2) === 1 && newCoordinatesY[newCross[i]]%2 === 0) {//HORIZONTAL expansion
        //Check left or right
        let coordinatesNewRegion = []
        for (let j = 0; j < newName.length; j++){
          if(newCoordinatesX[j] === newCoordinatesX[newCross[i]]-1 && newCoordinatesY[j] === newCoordinatesY[newCross[i]]){
            coordinatesNewRegion.push([newCoordinatesX[j]+2,newCoordinatesY[j]])//exist left so push right (2: obstacle + free zone)
          } else if (newCoordinatesX[j] === newCoordinatesX[newCross[i]]+1 && newCoordinatesY[j] === newCoordinatesY[newCross[i]]) {
            coordinatesNewRegion.push([newCoordinatesX[j]-2,newCoordinatesY[j]])//exist right so push left (2: obstacle + free zone)
          }
        }
        //Create
        if (coordinatesNewRegion.length === 1){
          //new region
          newCoordinatesX.push(coordinatesNewRegion[0][0])
          newCoordinatesY.push(coordinatesNewRegion[0][1])
          newIsUncrossed.push(false)
          let z = parseInt(Math.random()*REGIONS_NAMES.length)
          newType.push(REGIONS_NAMES[z])
          newName.push(REGIONS_NAMES_FR[z]+' de '+NameGenerator(3, 7))
          newZoneMax.push(parseInt(Math.random()*7)+6)
          newZoneTypes.push([])
          newValues.push([])
          newOwner.push([])
          newReport.push(<span><span role="img" aria-label="crossing">🚸</span> Après avoir traversé <u>{newName[newCross[i]]}</u>, nous avons découvert : <u>{newName[newName.length-1]}</u> !</span>)
          //new obstacles
          let coordinatesObstaclesToCreate = []
          for (let j = 0; j < newName.length; j++){
            if(newCoordinatesX[j] === coordinatesNewRegion[0][0]-1 && newCoordinatesY[j] === coordinatesNewRegion[0][1]){
              coordinatesObstaclesToCreate.push('left')//exist left
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0]+1 && newCoordinatesY[j] === coordinatesNewRegion[0][1]) {
              coordinatesObstaclesToCreate.push('right')//exist right
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0] && newCoordinatesY[j] === coordinatesNewRegion[0][1]+1) {
              coordinatesObstaclesToCreate.push('up')//exist up
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0] && newCoordinatesY[j] === coordinatesNewRegion[0][1]-1) {
              coordinatesObstaclesToCreate.push('down')//exist down
            }
          }
          //console.log('obstacle exist in '+coordinatesObstaclesToCreate)
          if (!coordinatesObstaclesToCreate.includes('left')){
            newCoordinatesX.push(coordinatesNewRegion[0][0]-1)
            newCoordinatesY.push(coordinatesNewRegion[0][1])
          }
          if (!coordinatesObstaclesToCreate.includes('right')){
            newCoordinatesX.push(coordinatesNewRegion[0][0]+1)
            newCoordinatesY.push(coordinatesNewRegion[0][1])
          }
          if (!coordinatesObstaclesToCreate.includes('up')){
            newCoordinatesX.push(coordinatesNewRegion[0][0])
            newCoordinatesY.push(coordinatesNewRegion[0][1]+1)
          }
          if (!coordinatesObstaclesToCreate.includes('down')){
            newCoordinatesX.push(coordinatesNewRegion[0][0])
            newCoordinatesY.push(coordinatesNewRegion[0][1]-1)
          }
          for (let j = 0; j < 4-coordinatesObstaclesToCreate.length; j++){
            newIsUncrossed.push(true)
            let z = parseInt(Math.random()*OBSTACLES_NAMES.length)
            newType.push(OBSTACLES_NAMES[z])
            newName.push(OBSTACLES_NAMES_FR[z]+' de '+NameGenerator(3, 7))
            newZoneMax.push(0)
            newZoneTypes.push([])
            newValues.push([])
            newOwner.push(['noOne'])
          }
          //console.log('nCX length> '+newCoordinatesX.length+' - nName length> '+newName.length)
        }//end of Create
      } else if (newCoordinatesX[newCross[i]]%2 === 0 && Math.abs(newCoordinatesY[newCross[i]]%2) === 1) {//VERTICAL expansion
        //Check up or down
        let coordinatesNewRegion = []
        for (let j = 0; j < newName.length; j++){
          if(newCoordinatesX[j] === newCoordinatesX[newCross[i]] && newCoordinatesY[j] === newCoordinatesY[newCross[i]]+1){
            coordinatesNewRegion.push([newCoordinatesX[j],newCoordinatesY[j]-2])//exist up so push down (2: obstacle + free zone)
          } else if (newCoordinatesX[j] === newCoordinatesX[newCross[i]] && newCoordinatesY[j] === newCoordinatesY[newCross[i]]-1) {
            coordinatesNewRegion.push([newCoordinatesX[j],newCoordinatesY[j]+2])//exist down so push up (2: obstacle + free zone)
          }
        }
        //Create
        if (coordinatesNewRegion.length === 1){
          //new region
          newCoordinatesX.push(coordinatesNewRegion[0][0])
          newCoordinatesY.push(coordinatesNewRegion[0][1])
          newIsUncrossed.push(false)
          let z = parseInt(Math.random()*REGIONS_NAMES.length)
          newType.push(REGIONS_NAMES[z])
          newName.push(REGIONS_NAMES_FR[z]+' de '+NameGenerator(3, 7))
          newZoneMax.push(parseInt(Math.random()*7)+6)
          newZoneTypes.push([])
          newValues.push([])
          newOwner.push([])
          newReport.push(<span><span role="img" aria-label="crossing">🚸</span> Après avoir traversé <u>{newName[newCross[i]]}</u>, nous avons découvert : <u>{newName[newName.length-1]}</u> !</span>)
          //new obstacles
          let coordinatesObstaclesToCreate = []
          for (let j = 0; j < newName.length; j++){
            if(newCoordinatesX[j] === coordinatesNewRegion[0][0]-1 && newCoordinatesY[j] === coordinatesNewRegion[0][1]){
              coordinatesObstaclesToCreate.push('left')//exist left
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0]+1 && newCoordinatesY[j] === coordinatesNewRegion[0][1]) {
              coordinatesObstaclesToCreate.push('right')//exist right
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0] && newCoordinatesY[j] === coordinatesNewRegion[0][1]+1) {
              coordinatesObstaclesToCreate.push('up')//exist up
            } else if (newCoordinatesX[j] === coordinatesNewRegion[0][0] && newCoordinatesY[j] === coordinatesNewRegion[0][1]-1) {
              coordinatesObstaclesToCreate.push('down')//exist down
            }
          }
          //console.log('obstacle exist in '+coordinatesObstaclesToCreate)
          if (!coordinatesObstaclesToCreate.includes('left')){
            newCoordinatesX.push(coordinatesNewRegion[0][0]-1)
            newCoordinatesY.push(coordinatesNewRegion[0][1])
          }
          if (!coordinatesObstaclesToCreate.includes('right')){
            newCoordinatesX.push(coordinatesNewRegion[0][0]+1)
            newCoordinatesY.push(coordinatesNewRegion[0][1])
          }
          if (!coordinatesObstaclesToCreate.includes('up')){
            newCoordinatesX.push(coordinatesNewRegion[0][0])
            newCoordinatesY.push(coordinatesNewRegion[0][1]+1)
          }
          if (!coordinatesObstaclesToCreate.includes('down')){
            newCoordinatesX.push(coordinatesNewRegion[0][0])
            newCoordinatesY.push(coordinatesNewRegion[0][1]-1)
          }
          for (let j = 0; j < 4-coordinatesObstaclesToCreate.length; j++){
            newIsUncrossed.push(true)
            let z = parseInt(Math.random()*OBSTACLES_NAMES.length)
            newType.push(OBSTACLES_NAMES[z])
            newName.push(OBSTACLES_NAMES_FR[z]+' de '+NameGenerator(3, 7))
            newZoneMax.push(0)
            newZoneTypes.push([])
            newValues.push([])
            newOwner.push(['noOne'])
          }
          //console.log('nCX length> '+newCoordinatesX.length+' - nName length> '+newName.length)
        }//end of Create
      } else {
        throw new Error(`Unhandled cross in game-turn-store: for position:${newCross[i]} X:${newCoordinatesX[newCross[i]]} Y:${newCoordinatesY[newCross[i]]}`);
      }*/
    }
    newCross = []

    // EXPLORE //
    for(let i = 0; i < newExplore.length; i++){
      let regionNamePosition = REGIONS_NAMES.indexOf(newType[newExplore[i]])
      let zoneTypePosition = REGIONS_ZONES_POSSIBILITIES[regionNamePosition][parseInt(Math.random()*REGIONS_ZONES_POSSIBILITIES[regionNamePosition].length)]
      if(newZoneTypes[newExplore[i]].length < newZoneMax[newExplore[i]]){
        newZoneTypes[newExplore[i]].push(ZONES_NAMES[zoneTypePosition]);
        let randomOwner = Math.random()
        if(newExplore[i] === 0){//explore first spot
          randomOwner = 0
        }
        //
        let randomOwnerText
        if(randomOwner < 0.25) {
          newResourcesQuantity[zoneTypePosition]++
          newOwner[newExplore[i]].push('player')
          randomOwnerText = 'disponible'
        } else if (randomOwner < 0.5) {
          newOwner[newExplore[i]].push('ally')
          randomOwnerText = 'contrôlé par un allié'
        } else if (randomOwner < 0.75) {
          newOwner[newExplore[i]].push('enemy')
          randomOwnerText = 'sous l\'emprise d\'un ennemi'
        } else {
          newOwner[newExplore[i]].push('neutral')
          randomOwnerText = 'contrôlé par un peuple neutre'
        }
        newReport.push(<span><span role="img" aria-label="compass">🧭</span> En explorant les alentours de <u>{newName[newExplore[i]]}</u>, nous sommes tombés sur un ensemble de {ZONES_NAMES_FR[zoneTypePosition]} <img alt={'['+ZONES_NAMES[zoneTypePosition]+']'} src={GetImage(ZONES_NAMES[zoneTypePosition])}/> <u>{randomOwnerText}</u> !</span>)
      } else {
        newReport.push(<span><span role="img" aria-label="compass">🧭</span> Nous n'avons rien trouvé de plus à explorer au niveau de <u>{newName[newExplore[i]]}</u>.</span>)
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
    turnNumber: newTurnNumber,
    preoccupationPoints: newPreoccupationPoints,
    preoccupationPointsMax: newPreoccupationPointsMax,
    resourcesName: newResourcesName,
    resourcesCategory: newResourcesCategory,
    resourcesQuantity: newResourcesQuantity,
    resourcesIsUnique: newResourcesIsUnique,
    whichTab: newWhichTab,
    report: newReport,

    clicked: newClicked,
    coordinatesX: newCoordinatesX,
    coordinatesY: newCoordinatesY,
    isUncrossed: newIsUncrossed,
    type: newType,
    name: newName,
    zoneMax: newZoneMax,
    zoneTypes: newZoneTypes,
    values: newValues,
    owner: newOwner,
    cross: newCross,
    explore: newExplore
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
