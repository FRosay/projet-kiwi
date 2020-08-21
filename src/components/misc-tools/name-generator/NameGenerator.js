import AddAdjective from './AddAdjective.js'

const lettersAll                = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] 
const pickChanceAll             = [10,   2,   3,   4,   14,  1,   2,   1,   8,   1,   2,   6,   4,   4,   5,   5,   2,   5,   6,   5,   5,   1,   1,   1,   1,   1] // en %
const pickChanceAllFinal        = [] // cumul des % pour arriver à 100
const lettersVoyels             = ['a', 'e', 'i', 'o', 'u', 'y']
const pickChanceVoyels          = [ 30,  35,  15,  8,   8,   4 ] 
const pickChanceVoyelsFinal     = [] 
const lettersConsonents         = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
const pickChanceConsonents      = [ 5,   5,   8,   2,   3,   3,   3,   3,   11,  3,   8,   10,  3,   6,  12,   11,  1,   1,   1,   1 ] 
const pickChanceConsonentsFinal = []

function NameGenerator(minLength, maxLength, requiredTitle, forcedLetters = [], forcedLettersPosition = [-1,-1]) {

    let result
    let generatedName = ['', '']
    let rng = Math.floor(Math.random() * 26)
    let nameLength = Math.floor(Math.random() * (maxLength - minLength) + minLength)
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

    function addTitle() {
        let title
        let requiredGender = ''
        
        if (requiredTitle[0] === true) {
            requiredGender= 'masculine'
        } else if (requiredTitle[1] === true) {
            requiredGender= 'feminine'
        } else if (requiredTitle[2] === true) {
            requiredGender= 'neutral'
        }
        
        title = AddAdjective(requiredGender)
        return title
    }

    function pickAnyLetter(lettersToAvoid = ['']) {
        let newLetter = ''
        let iteration = 0
        
        while ((rng >= pickChanceAllFinal[iteration]) || (lettersToAvoid.includes(lettersAll[iteration]))) {
            iteration++
        }
        newLetter = lettersAll[iteration]
        generatedName.push(newLetter)
    }

    function pickConsonent() {
        let consonent = ''
        let iteration = 0

        while (rng >= pickChanceConsonentsFinal[iteration]) {
            iteration++
        }
        consonent = lettersConsonents[iteration]
        generatedName.push(consonent)
    }

    function pickVoyel() {
        let voyel = ''
        let iteration = 0

        while (rng > pickChanceVoyelsFinal[iteration]) {
            iteration++
        }
        voyel = lettersVoyels[iteration]
        generatedName.push(voyel)
    }

    for (let i = 0; i < nameLength; i++) {

        let lastLetter          = generatedName[generatedName.length-1]
        let secondToLastLetter  = generatedName[generatedName.length-2]
        let thirdToLastLetter   = generatedName[generatedName.length-3]
        
        rng = Math.floor(Math.random() * (100 - 1) + 1)
        
        // On met -1 car le choix de la position commence à 1, mais l'array à 0
        if (i === (parseInt(forcedLettersPosition[0], 10)-1 )) {
            forcedLetters[0].forEach(letter => generatedName.push(letter))
            
        } else if (i === (parseInt(forcedLettersPosition[1], 10)-1)) {
            forcedLetters[1].forEach(letter => generatedName.push(letter))
            
        } else if (lastLetter === secondToLastLetter) { 
            // Après une lettre doublée, on force le changement
            pickAnyLetter([lastLetter])

        } else if (lettersVoyels.includes(lastLetter)) { 
            // Après une voyelle, on met une consonne
            pickConsonent()

        } else if (lettersConsonents.includes(lastLetter) && lettersConsonents.includes(secondToLastLetter) && lettersConsonents.includes(thirdToLastLetter)) {
            // Après 3 consonnes, on met une voyelle
            pickVoyel()

        } else {
            pickAnyLetter()
        }
    }

    generatedName = generatedName.slice(2)
    generatedName[0] = generatedName[0].toUpperCase()
    
    requiredTitle.includes(true) ? result = generatedName.toString().replace(/,/g, '') + ' ' + addTitle() : result = generatedName.toString().replace(/,/g, '')

    return result
}

export default NameGenerator;