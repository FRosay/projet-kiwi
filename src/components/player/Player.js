import React from 'react';


class Player extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
        preoccupationPoints: this.props.preoccupationPoints
    }

  }

  render () {
    return (
        <div>
            <h2>Player</h2>
            <p>Points de préoccupation restants : { this.state.preoccupationPoints }</p>
            <br/>
        </div>
    )
  }
}

export default Player;