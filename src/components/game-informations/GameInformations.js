import React from 'react';


class GameInformations extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      header: this.props.header,
      text: this.props.text,
      button: this.props.button,
    }

  }

  render () {
    return (
        <div id="game-informations-div">
            <h1>Header : { this.state.header }</h1>
            <p>Text : { this.state.text }</p>
            <p><button>{ this.state.button }</button></p>
        </div>
    )
  }
}

export default GameInformations;
