import React from 'react';
import './Technology.css';

import GetTechInfos from './GetTechInfos.js';
import GetImage from '../../GraphicResources.js'

function Technology(props) {

    let tech = GetTechInfos(props.techName)

    return (
        <div className='singleTech'>
            <img alt={ tech.techImage } src={ GetImage( tech.techImage ) }></img>
            <br />
            Nom : { tech.techName } <br />
            Coût : { tech.techCost} <br />
            Groupe de technologies : { tech.techGroup }
        </div>
    )
}

export default Technology;
