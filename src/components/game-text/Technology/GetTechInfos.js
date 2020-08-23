function GetTechInfos(techName) {

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

        case 'Random':
            let rng = Math.floor(Math.random() * Math.floor(3))
            if (rng === 0) {return GetTechInfos('Canne à pêche')}
            if (rng === 1) {return GetTechInfos('Filet de pêche')}
            if (rng === 2) {return GetTechInfos('Bâteau de pêche')} 
            break;

        default:
            break;
    }

    return techObject
}

export default GetTechInfos;
