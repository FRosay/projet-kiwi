const lettersAll                = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] 
const pickChanceAll             = [10,   2,   3,   4,   14,  1,   2,   1,   8,   1,   2,   6,   4,   4,   5,   5,   2,   5,   6,   5,   5,   1,   1,   1,   1,   1] // en %
const pickChanceAllFinal        = [] // cumul des % pour arriver à 100
const lettersVoyels             = ['a', 'e', 'i', 'o', 'u', 'y']
const pickChanceVoyels          = [ 30,  35,  15,  8,   8,   4 ] 
const pickChanceVoyelsFinal     = [] 
const lettersConsonents         = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
const pickChanceConsonents      = [ 5,   5,   8,   2,   3,   3,   3,   3,   11,  3,   8,   10,  3,   6,  12,   11,  1,   1,   1,   1 ] 
const pickChanceConsonentsFinal = []

function AddLetter(typeOfLetter, letterToAvoid = '') {

    let letterToReturn = ''
    let iteration = 0
    let rng
    let pickChance = 0

    for (let i=0; i < pickChanceAll.length; i++) {
        pickChance += pickChanceAll[i]
        pickChanceAllFinal.push(pickChance)
    }
    pickChance = 0
    for (let i=0; i < pickChanceVoyels.length; i++) {
        pickChance += pickChanceVoyels[i]
        pickChanceVoyelsFinal.push(pickChance)
    }
    pickChance = 0
    for (let i=0; i < pickChanceConsonents.length; i++) {
        pickChance += pickChanceConsonents[i]
        pickChanceConsonentsFinal.push(pickChance)
    }
    
    function pickAnyLetter(lettersToAvoid = ['']) {
        let newLetter = ''
        
        rng = Math.floor(Math.random() * (100 - 1) + 1)

        while ((rng >= pickChanceAllFinal[iteration]) || (lettersToAvoid.includes(lettersAll[iteration]))) {
            iteration++
        }
        newLetter = lettersAll[iteration]
        letterToReturn = newLetter
    }

    function pickConsonent() {
        let consonent = ''

        rng = Math.floor(Math.random() * (100 - 1) + 1)

        while (rng >= pickChanceConsonentsFinal[iteration]) {
            iteration++
        }
        consonent = lettersConsonents[iteration]
        letterToReturn = consonent
    }

    function pickVoyel() {
        let voyel = ''

        rng = Math.floor(Math.random() * (100 - 1) + 1)

        while (rng > pickChanceVoyelsFinal[iteration]) {
            iteration++
        }
        voyel = lettersVoyels[iteration]
        letterToReturn = voyel
    }

    if (typeOfLetter === 'any') {
        pickAnyLetter()
    } else if (typeOfLetter === 'consonent') {
        pickConsonent()
    } else if (typeOfLetter === 'voyel') {
        pickVoyel()
    }

    return letterToReturn
}

export default AddLetter;