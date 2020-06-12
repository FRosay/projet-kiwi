import React from 'react';
import SingleResource from './single-resource'
import { usePlayerStore } from '../player/player-store.js';


function ResourcesView() {

  const { state, dispatch } = usePlayerStore();
  
  return (
      <div id="resources-view-div">
          { state.resources.map((resource, index) => {
              return (
                <div>
                  <button onClick={() => dispatch({ resource: resource.name, type: 'decrement' })}>-</button>
                  <SingleResource key= { index } name= { resource.name } type= { resource.type } quantity= { resource.quantity } isUnique= { resource.isUnique} shortVersion= { true } />
                  <button onClick={() => dispatch({ resource: resource.name, type: 'increment' })}>+</button>
                </div>
              )
          })}
          <br/>
      </div>
  )
}
 
export default ResourcesView