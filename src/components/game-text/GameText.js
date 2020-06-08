import React from 'react';


class GameText extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      forReport: this.props.forReport,
      forExploration: this.props.forExploration,
      forDiplomacy: this.props.forDiplomacy,
      forTechnology: this.props.forTechnology,
      forPolitic: this.props.forPolitic
    }

  }

  render () {
    return (
        <div id="game-text-div">
            <p>Corps</p>
        </div>
    )
  }
}

export default GameText;
