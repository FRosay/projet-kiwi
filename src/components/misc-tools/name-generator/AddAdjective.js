const masculineAdjectives = ["le Grand", "le Fier", "l'Invaincu", "l'Ancien", "le Sage", "l'Ordonné", "le Pieux", "le Petit"]
const feminineAdjectives = ["la Grande", "la Fière", "l'Invaincue", "l'Ancienne", "la Sage", "l'Ordonnée", "la Pieuse", "la Petite"]
const neutralAdjectives = ["l'Immarcescible", "l'Incommensurable"]
const adjectivesTypes   = ["masculine", "feminine", "neutral"]

function AddAdjective(requiredGender = '') {   
    let result
    let rng

    switch (requiredGender) {            
        case 'masculine':
            rng = Math.floor(Math.random() * Math.floor(masculineAdjectives.length))
            result = masculineAdjectives[rng]
            break;

        case 'feminine':
            rng = Math.floor(Math.random() * Math.floor(feminineAdjectives.length))
            result = feminineAdjectives[rng]
            break;

        case 'neutral':
            rng = Math.floor(Math.random() * Math.floor(neutralAdjectives.length))
            result = neutralAdjectives[rng]
            break;

        default:
            rng = Math.floor(Math.random() * Math.floor(adjectivesTypes.length))
            result = AddAdjective(adjectivesTypes[rng])
            break;
    }

    return result
}

export default AddAdjective;