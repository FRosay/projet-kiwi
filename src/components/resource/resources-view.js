import React from 'react';
import SingleResource from './single-resource.js'
import { usePlayerStore } from '../player/player-store.js';


function ResourcesView() {

  const { state, dispatch } = usePlayerStore();

  let res = []
  for(let i = 0; i < state.resourcesName.length; i++){
    res.push(
      <SingleResource key= { i } name= { state.resourcesName[i] } type= { state.resourcesCategory[i] } quantity= { state.resourcesQuantity[i] } isUnique= { state.resourcesIsUnique[i] } shortVersion= { true } dispatch= { dispatch } />
    )
  }

  return (
      <div id='resources-view-div'>
        {res}
      </div>
  )
}

export default ResourcesView
