import React from 'react';
import './Technology.css';

function Technology(props) {

    return (
        <div>
            Nom : { props.techName }
            Coût : { props.techCost}
            Groupe de technologies : { props.techGroup }
        </div>
    )
}

export default Technology;
