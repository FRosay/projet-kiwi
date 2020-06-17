import React, { useState } from 'react';


function SingleResource(props) {
console.log("goin")
  const [resource, setResource] = useState({  name: props.name,
                                              type: props.type,
                                              quantity: props.quantity,
                                              isUnique: props.isUnique,
                                              shortVersion: props.shortVersion,
                                              imagePath: require('../../assets/images/'+props.name+'.png') });

  if (resource.shortVersion===true) {
    //console.log(props.quantity)
    return (
      <div id="resource-div">
        { resource.quantity } <img alt={ resource.name } src= { resource.imagePath }></img>
      </div>
    )
  } else {
    return (
      <div id="resource-div">
          <p>Nom : { resource.name }</p>
          <p>Type de la ressource : { resource.type }</p>
          <p>Quantité acquise : { resource.quantity }</p>
          <p>Ressource unique : { resource.isUnique ? 'Oui' : 'Non' }</p>
          <br/>
      </div>
    )
  }
}

export default SingleResource;
