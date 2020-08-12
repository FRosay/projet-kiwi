import React from 'react';
import './tooltip.css';

function Tooltip(props) {
    
    return(
        <div className="tooltip">{ props.tooltip }
            <span className="tooltiptext">{ props.tooltipText }</span>
        </div> 
    )
}

export default Tooltip;

