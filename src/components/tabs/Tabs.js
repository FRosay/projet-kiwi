import React from 'react';
import './Tabs.css';


class Tabs extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      name: ["Rapport", "Exploration", "Diplomatie", "Technologie", "Politique"],
      isDisplayed: [false, false, false, false, false],
      isClickable: [true, true, false, true, true]
    }

  }

  render() {
    const rName = this.state.name
    const rIsDisplayed = [false, false, false, false, false]
    //const rIsClickable = this.state.isClickable
    const buttons = []


    for (let i = 0; i < rName.length; i++) {
      let buttonLine = <button onClick={() => rIsDisplayed[i]=true & this.setState({isDisplayed: rIsDisplayed})} key={i}>{rName[i]}</button>
      buttons.push(buttonLine);
      console.log(this.state.isDisplayed)
    }
    console.log("zack")

    return (
      <div>
        {buttons}
      </div>
    )
  }
}

export default Tabs;
