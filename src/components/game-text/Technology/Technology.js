import React from 'react';
import './Technology.css';

import GetImage from '../../GraphicResources.js'

function Technology(props) {

    return (
        <div className='singleTech'>
            <img alt={ props.techImage } src={ GetImage( props.techImage ) }></img>
            <br />
            Nom : { props.techName } <br />
            Coût : { props.techCost} <br />
            Groupe de technologies : { props.techGroup }
        </div>
    )
}

export default Technology;
