const lettersAll = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] // 26
const pickChanceAll = [10, 12, 15, 19, 33, 34, 36, 37, 45, 46, 48, 54, 58, 62, 67, 72, 74, 79, 85, 90, 95, 96, 97, 98, 99, 100] // as %
const lettersVoyels = ['a', 'e', 'i', 'o', 'u', 'y'] // 6
const pickChanceVoyels = [30, 65, 80, 88, 96, 100] // as %
const lettersConsonents = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'] // 20
const pickChanceConsonents = [5, 9, 16, 18, 21, 23, 25, 29, 40, 43, 51, 61, 66, 72, 83, 92, 94, 96, 98, 100] // as %

function NameGenerator(minLength, maxLength) {

    let generatedName = ['', '']
    let rng = Math.floor(Math.random() * 26)
    let nameLength = Math.random() * (maxLength - minLength) + minLength
    let result

    function pickAnyLetter(letterToAvoid) {
        let newLetter = ''
        let iteration = 0

        while ((rng >= pickChanceAll[iteration]) && (lettersAll[iteration] !== letterToAvoid)) {
            iteration++
        }

        newLetter = lettersAll[iteration]
        generatedName.push(newLetter)
    }

    function pickConsonent() {
        let consonent = ''
        let iteration = 0

        while (rng >= pickChanceConsonents[iteration]) {
            iteration++
        }

        consonent = lettersConsonents[iteration]
        generatedName.push(consonent)
    }

    function pickVoyel() {
        let voyel = ''
        let iteration = 0

        while (rng > pickChanceVoyels[iteration]) {
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

        if (lastLetter === secondToLastLetter) { 
            // Après une lettre doublée, on force le changement
            pickAnyLetter(lastLetter)

        } else if (lettersVoyels.includes(lastLetter)) { 
            // Après une voyelle, on met une consonne
            pickConsonent()

        } else if (lettersConsonents.includes(lastLetter) && lettersConsonents.includes(secondToLastLetter) && lettersConsonents.includes(thirdToLastLetter)) {
            // Après 3 consonnes, on met une voyelle
            pickVoyel()

        } else {
            pickAnyLetter('')
        }
    }

    result = generatedName.slice(2)

    return result
}

export default NameGenerator;