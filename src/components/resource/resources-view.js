import React from 'react';

import Resource from './Resource'


class ResourcesView extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      resources: []
    }
  }

  render () {
    return (
        <div id="resources-div">
            {this.state.resources.map((resource, index) => {
                return (
                    <Resource key= { index } name= { resource.name } type= { resource.type } quantity= { resource.quantity } isUnique= { resource.isUnique} />
                )
            })}
            <br/>
        </div>
    )
  }
}

export default ResourcesView;
