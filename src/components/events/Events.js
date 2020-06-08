import React from 'react';


class Events extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      name: this.props.name,
      consequences: this.props.consequences,
      text: this.props.text,
      conditions: this.props.conditions
    }

  }

  render () {
    return (
        <div>
            <h2>{ this.state.name }</h2>
            <p>Conséquence : { this.state.consequences }</p>
            <p>Texte : { this.state.text }</p>
            <p>Conditions : { this.state.conditions }</p>
            <br/>
        </div>
    )
  }
}

export default Events;
