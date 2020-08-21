import React, { useState } from 'react';

import { usePlayerStore } from './player/player-store.js';
import NameGenerator from './misc-tools/name-generator/NameGenerator.js';

function Testing() {
    const { playerState, playerDispatch }       = usePlayerStore();
    const [range, setRange]                     = useState(1);
    const [nameLengthRange, setNameLengthRange] = useState([3,8])
    const [randomName, setRandomName]           = useState('')
    const [titleIsSelected, setTitleIsSelected] = useState([false, false, false, false])
    const [addedLetters, setAddedLetters] = useState([[''],['']])
    const [addedLettersPosition, setAddedLettersPosition] = useState([-1,-1])

    function generateRandomName(minLength, maxLength) {
        let generatedName = ''

        generatedName = NameGenerator(minLength, maxLength, titleIsSelected, addedLetters, addedLettersPosition)

        setRandomName(generatedName)
    }

    function handleChange(whichField, newValue) {
        let newLetters = []
        newLetters = newValue.split('')
        
        if (whichField === 'one') {
            setAddedLetters([newLetters, addedLetters[1]])
        } else {
            setAddedLetters([addedLetters[0], newLetters])
        }
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
                <li>
                    { playerState.resourcesQuantity[0] } { playerState.resourcesName[0] } : 
                    <button onClick={() => playerDispatch({ type: 'increaseRes', index:0, range:1}) }>+</button>
                    <button onClick={() => playerDispatch({ type: 'decreaseRes', index:0, range:1}) }>-</button>
                </li>
                <li>
                    { playerState.resourcesQuantity[1] } { playerState.resourcesName[1] } : 
                    <button onClick={() => playerDispatch({ type: 'increaseRes', index:1, range:1}) }>+</button>
                    <button onClick={() => playerDispatch({ type: 'decreaseRes', index:1, range:1}) }>-</button>
                </li>
                <li>{ playerState.resourcesQuantity[2] } { playerState.resourcesName[2] } : 
                    <button onClick={() => playerDispatch({ type: 'increaseRes', index:2, range:1}) }>+</button>
                    <button onClick={() => playerDispatch({ type: 'decreaseRes', index:2, range:1}) }>-</button>
                </li>
                <li>{ playerState.resourcesQuantity[3] } { playerState.resourcesName[3] } : 
                    <button onClick={() => playerDispatch({ type: 'increaseRes', index:3, range:1}) }>+</button>
                    <button onClick={() => playerDispatch({ type: 'decreaseRes', index:3, range:1}) }>-</button>
                </li>
            </ul> 
            <br />
            <p>
                Nom généré aléatoirement : {randomName}
                <br /> <br />
                <button onClick={() => generateRandomName(nameLengthRange[0], nameLengthRange[1])}>Générer un nouveau nom </button>
                <br />
                qui a entre <input type='number' onChange={(event) => setNameLengthRange([event.target.value,nameLengthRange[1]])} min='1' max={nameLengthRange[1]} style={{ textAlign: 'center', width: '8%' }} /> 
                et <input type='number' onChange={(event) => setNameLengthRange([nameLengthRange[0],event.target.value])} min={nameLengthRange[0]} max='100' style={{ textAlign: 'center', width: '8%' }} /> lettres
                
                <br />
                Ajouter un titre masculin <input type='checkbox' checked={titleIsSelected[0]} onChange={() => setTitleIsSelected([!titleIsSelected[0], false, false, false])} />,
                féminin <input type='checkbox' checked={titleIsSelected[1]} onChange={() => setTitleIsSelected([false, !titleIsSelected[1], false, false])} />,
                neutre <input type='checkbox' checked={titleIsSelected[2]} onChange={() => setTitleIsSelected([false, false, !titleIsSelected[2], false])} />
                ou aléatoire <input type='checkbox' checked={titleIsSelected[3]} onChange={() => setTitleIsSelected([false, false, false, !titleIsSelected[3]])} />
                <br />

                Ajouter <input onChange={(event) => handleChange('one', event.target.value)} style={{ textAlign: 'center', width: '12%', height:'0.8em' }} />
                et      <input onChange={(event) => handleChange('two', event.target.value)} style={{ textAlign: 'center', width: '12%', height:'0.8em' }} />
                dans le nom, à la
                <input type='number' onChange={(event) => setAddedLettersPosition([event.target.value, addedLettersPosition[1]])} min='1' max={nameLengthRange[1]} style={{ textAlign:'center', width:'8%', height:'0.8em' }} />
                {parseInt(addedLettersPosition[0], 10) === 1 ? 'ère' : 'ème'} et à la 
                <input type='number' onChange={(event) => setAddedLettersPosition([addedLettersPosition[0], event.target.value])} min='1' max={nameLengthRange[1]} style={{ textAlign:'center', width:'8%', height:'0.8em' }} />
                {parseInt(addedLettersPosition[1], 10) === 1 ? 'ère' : 'ème'} position
            </p>
        </div>
    )
}

export default Testing;