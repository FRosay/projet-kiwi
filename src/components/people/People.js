import React from 'react';


class People extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
        name: this.props.name,
        resources: this.props.resources,
        culture: this.props.culture,
    }

  }

  render () {
    return (
        <div>
            <h2>Votre peuple</h2>
            <p>Nom : { this.state.name }</p>
            <p>Culture : { this.state.culture }</p>
            <p>Ressources à disposition : { this.state.resources }</p>
            <br/>
        </div>
    )
  }
}

export default People;
