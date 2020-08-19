const lettersAll = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] // 26
//const pickChanceAll = [10, 2, 3, 4, 14, 1, 2, 1, 8, 1, 2, 6, 3, 6, 5, 5, 2, 6, 6, 6, 5, 1, 0.5, 0.5, 0.5, 0.5] // as %
const lettersVoyels = ['a', 'e', 'i', 'o', 'u', 'y'] // 6
//const pickChanceVoyels = [30, 35, 15, 8, 8, 4] // as %
const lettersConsonents = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'] // 20

function NameGenerator(minLength, maxLength) {

    let generatedName = ['', '']
    let rng = Math.floor(Math.random() * 26)
    let nameLength = Math.random() * (maxLength - minLength) + minLength
    let result

    for (let i = 0; i < nameLength; i++) {

        let lastLetter          = generatedName[generatedName.length-1]
        let secondToLastLetter  = generatedName[generatedName.length-2]

        if (lastLetter === secondToLastLetter) { // Pas plus de 2x la même lettre à la suite
            while (lettersAll[rng] === lastLetter) {
                rng = Math.floor(Math.random() * 26)
            }
            generatedName.push(lettersAll[rng])
        } else {

            if (lettersVoyels.includes(lastLetter)) { // Mettre une consonne après une voyelle
                rng = Math.floor(Math.random() * 20)
                generatedName.push(lettersConsonents[rng])
            } else {
                generatedName.push(lettersAll[rng])
            }
        }
        rng = Math.floor(Math.random() * 26)
    }

    result = generatedName.slice(2)

    return result
}

export default NameGenerator;