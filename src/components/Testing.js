import React, { useState } from 'react';

import { usePlayerStore } from './player/player-store.js';
import NameGenerator from './misc-tools/name-generator/NameGenerator.js';

function Testing() {
    const { playerState, playerDispatch }       = usePlayerStore();
    const [range, setRange]                     = useState(1);
    const [nameLengthRange, setNameLengthRange] = useState([3,8])
    const [randomName, setRandomName]           = useState('')
    const [titleIsSelected, setTitleIsSelected] = useState(false)
    const [apostrophyIsSelected, setApostrophyIsSelected] = useState(false)

    function generateRandomName(minLength, maxLength) {
        let generatedName = ''

        generatedName = NameGenerator(minLength, maxLength, titleIsSelected, apostrophyIsSelected)

        setRandomName(generatedName)
    }

    return (
        <div>
            <p>
                <button onClick={() => playerDispatch({ type: 'removePoints', range: range })}>Diminuer</button>
                Points de préoccupation actuels: { playerState.preoccupationPoints }
                <button onClick={() => playerDispatch({ type: 'addPoints', range: range })}>Augmenter</button>
            </p>

            <p>Valeur d'augmentation ou de diminution des PPs :
                <button onClick={() => setRange(range - 1)}>-</button>
                { range }
                <button onClick={() => setRange(range + 1)}>+</button>
            </p>
            <button onClick={() => playerDispatch({ type: 'resetPoints' })}>Réinitialiser</button> <br /><br />

            <ul>
                <li>{ playerState.resourcesQuantity[0] } { playerState.resourcesName[0] } : <button onClick={() => playerDispatch({ type: 'increaseRes', index:0, range:1}) }>+</button><button onClick={() => playerDispatch({ type: 'decreaseRes', index:0, range:1}) }>-</button></li>
                <li>{ playerState.resourcesQuantity[1] } { playerState.resourcesName[1] } : <button onClick={() => playerDispatch({ type: 'increaseRes', index:1, range:1}) }>+</button><button onClick={() => playerDispatch({ type: 'decreaseRes', index:1, range:1}) }>-</button></li>
                <li>{ playerState.resourcesQuantity[2] } { playerState.resourcesName[2] } : <button onClick={() => playerDispatch({ type: 'increaseRes', index:2, range:1}) }>+</button><button onClick={() => playerDispatch({ type: 'decreaseRes', index:2, range:1}) }>-</button></li>
                <li>{ playerState.resourcesQuantity[3] } { playerState.resourcesName[3] } : <button onClick={() => playerDispatch({ type: 'increaseRes', index:3, range:1}) }>+</button><button onClick={() => playerDispatch({ type: 'decreaseRes', index:3, range:1}) }>-</button></li>
            </ul> <br />

            <p>
                Nom généré aléatoirement : {randomName}
                <br />
                <button onClick={() => generateRandomName(nameLengthRange[0], nameLengthRange[1])}>Générer un nouveau nom qui a entre {nameLengthRange[0]} et {nameLengthRange[1]} lettres</button>
                <br />
                Minimum de lettres : <button onClick={() => setNameLengthRange([(nameLengthRange[0]-1),nameLengthRange[1]])}>-</button><button onClick={() => setNameLengthRange([(nameLengthRange[0]+1),nameLengthRange[1]])}>+</button>
                Maximum de lettres : <button onClick={() => setNameLengthRange([nameLengthRange[0],(nameLengthRange[1]-1)])}>-</button><button onClick={() => setNameLengthRange([nameLengthRange[0],(nameLengthRange[1]+1)])}>+</button>
                <br />
                <label>
                <input
                    type="checkbox"
                    name='Ajouter un titre ?'
                    checked={titleIsSelected}
                    onChange={() => setTitleIsSelected(!titleIsSelected)}
                    className="form-check-input"
                />
                Ajouter un titre ?
                </label>
                <br />
                <label>
                <input
                    type="checkbox"
                    name='Apostrophe dans le nom ?'
                    checked={apostrophyIsSelected}
                    onChange={() => setApostrophyIsSelected(!apostrophyIsSelected)}
                    className="form-check-input"
                />
                Apostrophe dans le nom ?
                </label> 
            </p>
        </div>
    )
}

export default Testing;