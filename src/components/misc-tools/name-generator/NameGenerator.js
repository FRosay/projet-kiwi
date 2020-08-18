const lettersAll = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] // 26
const lettersVoyels = ['A', 'E', 'I', 'O', 'U', 'Y'] // 6
const pickChanceVoyels = [20, 25, 20, 15, 15, 5] // as %
const lettersConsonents = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'] // 20

function NameGenerator(minLength, maxLength) {
  
    let generatedName = ''
    let rng = Math.floor(Math.random() * 26)
    let nameLength = Math.random() * (maxLength - minLength) + minLength

    for (let i = 0; i < nameLength; i++) {
        let lastLetter

        if (i===0) {
            generatedName += lettersAll[rng]
            lastLetter = lettersAll[rng]
        } else {
            if (lettersVoyels.includes(lastLetter)) {
                rng = Math.floor(Math.random() * 20)
                generatedName += lettersConsonents[rng].toLowerCase()
                lastLetter = lettersConsonents[rng]
            } else {
                generatedName += lettersAll[rng].toLowerCase()
                lastLetter = lettersAll[rng]
            }
        }
        

        rng = Math.floor(Math.random() * 26)
    }

    return generatedName
}

export default NameGenerator;
