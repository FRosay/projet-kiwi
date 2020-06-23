import React from 'react';


function SingleResource(props) {

  if (props.shortVersion===true) {
    return (
      <div id="resource-div">
        { props.quantity } <img alt={ props.name } src= { require('../../assets/images/'+props.name+'.png') }></img>
      </div>
    )
  } else {
    return (
      <div id="resource-div">
          <p>Nom : { props.name }</p>
          <p>Type de la ressource : { props.type }</p>
          <p>Quantité acquise : { props.quantity }</p>
          <p>Ressource unique : { props.isUnique ? 'Oui' : 'Non' }</p>
          <br/>
      </div>
    )
  }
}

export default SingleResource;
