const masculineAdjectives = ["le Grand", "le Fier", "l'Invaincu", "l'Ancien", "le Sage", "l'Ordonné", "le Pieux", "le Petit", "le Fort", "le Dur", "le Monstrueux", "le Cruel", "l'Approximatif", "le Flamboyant"]
const feminineAdjectives = ["la Grande", "la Fière", "l'Invaincue", "l'Ancienne", "la Sage", "l'Ordonnée", "la Pieuse", "la Petite", "la Forte", "la Dure", "la Monstrueuse", "la Cruelle", "l'Approximative", "la Flamboyante"]
const neutralAdjectives = ["l'Immarcescible", "l'Incommensurable", "l'Admirable", "l'Apocalyptique", "l'Insupportable", "l'Honnête", "l'Exemplaire", "l'Équitable", "l'Inique", "l'Intenable", "l'Incrédule"]
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