import AddAdjective from './AddAdjective.js'
import AddLetter    from './AddLetter.js'

const lettersVoyels             = ['a', 'e', 'i', 'o', 'u', 'y']
const lettersConsonents         = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']

function NameGenerator(minLength, maxLength, requiredTitle = [false, false, false, false], forcedLetters = [[''],['']], forcedLettersPosition = [-1,-1]) {

    let result
    let generatedName                   = []
    let nameLength                      = Math.floor(Math.random() * (Math.floor(maxLength) - Math.ceil(minLength) + 1) + Math.ceil(minLength))
    let firstForcedLettersPositioning
    let secondForcedLettersPositioning

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

    if (parseInt(forcedLettersPosition[0], 10) === -1) {
        firstForcedLettersPositioning = Math.floor(Math.random() * Math.floor(nameLength))
    } else {
        firstForcedLettersPositioning = (parseInt(forcedLettersPosition[0], 10)-1)
    }
    if (parseInt(forcedLettersPosition[1], 10) === -1) {
        secondForcedLettersPositioning = Math.floor(Math.random() * Math.floor(nameLength))
    } else {
        secondForcedLettersPositioning = (parseInt(forcedLettersPosition[1], 10)-1)
    }

    for (let i = 0; i < nameLength; i++) {

        let lastLetter          = generatedName[generatedName.length-1]
        let secondToLastLetter  = generatedName[generatedName.length-2]
        let thirdToLastLetter   = generatedName[generatedName.length-3]

        if (forcedLetters[0][0] !== '' && i === firstForcedLettersPositioning) {
            forcedLetters[0].forEach(letter => generatedName.push(letter))

        } else if (forcedLetters[1][0] !== '' && i === secondForcedLettersPositioning) {
            forcedLetters[1].forEach(letter => generatedName.push(letter))

        } else if (lastLetter === secondToLastLetter) {
            // Après une lettre doublée, on force le changement
            generatedName.push(AddLetter('any', lastLetter))

        } else if (lettersVoyels.includes(lastLetter)) {
            // Après une voyelle, on met une consonne
            generatedName.push(AddLetter('consonent'))

        } else if (lettersConsonents.includes(lastLetter) && lettersConsonents.includes(secondToLastLetter) && lettersConsonents.includes(thirdToLastLetter)) {
            // Après 3 consonnes, on met une voyelle
            generatedName.push(AddLetter('voyel'))

        } else {
            generatedName.push(AddLetter('any'))

        }
    }

    generatedName[0] = generatedName[0].toUpperCase()

    requiredTitle.includes(true) ? result = generatedName.toString().replace(/,/g, '') + ' ' + addTitle() : result = generatedName.toString().replace(/,/g, '')

    return result
}

export default NameGenerator;
