import React from 'react';


class Resource extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      name: this.props.name,
      type: this.props.type,
      quantity: this.props.quantity,
      isUnique: this.props.isUnique,
      shortVersion: this.props.shortVersion,
      imagePath: '',
    }

  }

  render () {
    if (this.state.shortVersion===true) {
      return (
        <div id="resource-div">
          { this.state.quantity } <img src= { this.state.imagePath }></img>
        </div>
      )
    } else {
      return (
        <div id="resource-div">
            <p>Nom : { this.state.name }</p>
            <p>Type de la ressource : { this.state.type }</p>
            <p>Quantité acquise : { this.state.quantity }</p>
            <p>Ressource unique : { this.state.isUnique ? 'Oui' : 'Non' }</p>
            <br/>
        </div>
      )
    }
  }
}

export default Resource;
