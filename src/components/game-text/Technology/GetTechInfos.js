function GetTechInfos(techName) {

    let techObject = {}
    techObject.techName = techName
    
    switch (techName) {
        case 'Canne à pêche':
            techObject.techGroup = 'Pêche'
            techObject.techCost = 1
            break;

        case 'Filet de pêche':
            techObject.techGroup = 'Pêche'
            techObject.techCost = 2
            break;

        case 'Bâteau de pêche':
            techObject.techGroup = 'Pêche'
            techObject.techCost = 3
            break;

        case '':
            break;

        default:
            break;
    }

    return techObject
}

export default GetTechInfos;
