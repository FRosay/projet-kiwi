import React from 'react';
import './Tabs.css';

const NAMES_TABS = ["Rapport", "Exploration", "Diplomatie", "Technologie", "Politique"]

class Tabs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isDisplayed: [false, false, false, false, false],
      isClickable: [true, true, false, true, true]
    }
  }

  buttonsRender(){
    let buttons = []
    for (let i = 0; i < NAMES_TABS.length; i++) {
      buttons.push(<button className={ this.state.isDisplayed[i] ? "is-displayed" : ""} disabled={ this.state.isClickable[i] ? false : true }  onClick={ () => this.handleClick(i) } key={i}>{ NAMES_TABS[i] }</button>);
    }
    return buttons
  }

  handleClick(witchMenu){
    let rIsDisplayed = [false, false, false, false, false]
    rIsDisplayed[witchMenu]=true
    this.setState({isDisplayed: rIsDisplayed})
  }

  render() {
    return (
      <div id="tabs-div">
        { this.buttonsRender() }
      </div>
    )
  }
}

export default Tabs;
