import React, { useState } from 'react';

function StartingLocation() {

    const [environmentChoice, setEnvironment] = useState(0)
    const [populationChoice, setPopulation] = useState(0)

    const [woodChoice, setWood] = useState(0)
    const [stoneChoice, setStone] = useState(0)
    const [mineralsChoice, setMinerals] = useState(0)
    const [foodChoice, setFood] = useState(0)

    const environment = ['Montagneux', 'Forestier', 'Océanique', 'Plaines']
    const population = ['Inexistante', 'Faible', 'Modérée', 'Importante']
    
    const woodPresence = ['Inexistante', 'Incertaine', 'Probable', 'Très probable' ,'Certaine']
    const stonePresence = ['Inexistante', 'Incertaine', 'Probable', 'Très probable' ,'Certaine']
    const mineralsPresence = ['Inexistante', 'Incertaine', 'Probable', 'Très probable' ,'Certaine']
    const foodPresence = ['Faible quantité', 'Quantité acceptable', 'Grande quantité', 'Abondance']

    function changeEnvironment(wayToGo) {
        if (wayToGo === -1 && environmentChoice === 0) {
            setEnvironment(environment.length - 1)
        } else if (wayToGo === 1 && environmentChoice === (environment.length - 1)) {
            setEnvironment(0)
        } else {
            setEnvironment(environmentChoice + wayToGo)
        }
    }

    function changePopulation(wayToGo) {
        if (wayToGo === -1 && populationChoice === 0) {
            setPopulation(population.length - 1)
        } else if (wayToGo === 1 && populationChoice === (population.length - 1)) {
            setPopulation(0)
        } else {
            setPopulation(populationChoice + wayToGo)
        }
    }

    function changeWoodPresence(wayToGo) {
        if (wayToGo === -1 && woodChoice === 0) {
            setWood(woodPresence.length - 1)
        } else if (wayToGo === 1 && woodChoice === (woodPresence.length - 1)) {
            setWood(0)
        } else {
            setWood(woodChoice + wayToGo)
        }
    }

    function changeStonePresence(wayToGo) {
        if (wayToGo === -1 && stoneChoice === 0) {
            setStone(stonePresence.length - 1)
        } else if (wayToGo === 1 && stoneChoice === (stonePresence.length - 1)) {
            setStone(0)
        } else {
            setStone(stoneChoice + wayToGo)
        }
    }

    function changeMineralsPresence(wayToGo) {
        if (wayToGo === -1 && mineralsChoice === 0) {
            setMinerals(mineralsPresence.length - 1)
        } else if (wayToGo === 1 && mineralsChoice === (mineralsPresence.length - 1)) {
            setMinerals(0)
        } else {
            setMinerals(mineralsChoice + wayToGo)
        }
    }

    function changeFoodPresence(wayToGo) {
        if (wayToGo === -1 && foodChoice === 0) {
            setFood(foodPresence.length - 1)
        } else if (wayToGo === 1 && foodChoice === (foodPresence.length - 1)) {
            setFood(0)
        } else {
            setFood(foodChoice + wayToGo)
        }
    }

    return (
        <div>
            <p>
                Environnement : <button onClick={() => changeEnvironment(-1)}>&lt;</button> { environment[environmentChoice] } <button onClick={() => changeEnvironment(1)}>&gt;</button> <br />
                Population : <button onClick={() => changePopulation(-1)}>&lt;</button> { population[populationChoice] } <button onClick={() => changePopulation(1)}>&gt;</button> <br />
            </p>
            <p>
                Source de bois : <button onClick={() => changeWoodPresence(-1)}>&lt;</button> { woodPresence[woodChoice] } <button onClick={() => changeWoodPresence(1)}>&gt;</button> <br />
                Source de roche : <button onClick={() => changeStonePresence(-1)}>&lt;</button> { stonePresence[stoneChoice] } <button onClick={() => changeStonePresence(1)}>&gt;</button> <br />
                Source de minerais : <button onClick={() => changeMineralsPresence(-1)}>&lt;</button> { mineralsPresence[mineralsChoice] } <button onClick={() => changeMineralsPresence(1)}>&gt;</button> <br />
                Source de nourriture : <button onClick={() => changeFoodPresence(-1)}>&lt;</button> { foodPresence[foodChoice] } <button onClick={() => changeFoodPresence(1)}>&gt;</button> <br />
            </p>
            <br /><br />
            <button>Valider</button>
        </div>
    )
}

export default StartingLocation;
