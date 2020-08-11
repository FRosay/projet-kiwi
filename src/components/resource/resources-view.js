import React from 'react';
import SingleResource from './single-resource.js'
import { usePlayerStore } from '../player/player-store.js';


function ResourcesView() {

  const { playerState, playerDispatch } = usePlayerStore();

  let res = []
  for(let i = 0; i < playerState.resourcesName.length; i++){
    res.push(
      <SingleResource key= { i } name= { playerState.resourcesName[i] } type= { playerState.resourcesCategory[i] } quantity= { playerState.resourcesQuantity[i] } isUnique= { playerState.resourcesIsUnique[i] } shortVersion= { true } playerDispatch= { playerDispatch } />
    )
  }

  return (
      <div id='resources-view-div'>
        {res}
      </div>
  )
}

export default ResourcesView
