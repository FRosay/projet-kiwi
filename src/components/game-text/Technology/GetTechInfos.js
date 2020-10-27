function GetTechInfos(techName) {

    const allTechNames = ['Canne à pêche', 'Filet de pêche', 'Bâteau de pêche']

    let techObject = {}
    techObject.techName = techName
    
    switch (techName) {
        case 'Canne à pêche':
            techObject.techGroup = 'Pêche'
            techObject.techCost = 1
            techObject.techImage = 'techFishingCane'
            break;

        case 'Filet de pêche':
            techObject.techGroup = 'Pêche'
            techObject.techCost = 2
            techObject.techImage = 'techFishingNet'
            break;

        case 'Bâteau de pêche':
            techObject.techGroup = 'Pêche'
            techObject.techCost = 3
            techObject.techImage = 'techFishingBoat'
            break;

        case 'Outils rudimentaires':
            techObject.techGroup = 'Outils'
            techObject.techCost = 1
            techObject.techImage = 'techRudimentaryTools'
            break;

        case 'Armes rudimentaires':
            techObject.techGroup = 'Militaire'
            techObject.techCost = 2
            techObject.techImage = 'techRudimentaryWeapons'
            break;

        case 'Agriculture rudimentaire':
            techObject.techGroup = 'Agriculture'
            techObject.techCost = 3
            techObject.techImage = 'techRudimentaryAgriculture'
            break;

        case 'Random':
            let rng = Math.floor(Math.random() * Math.floor(3))
            return GetTechInfos(allTechNames[rng])

        default:
            break;
    }

    return techObject
}

export default GetTechInfos;
