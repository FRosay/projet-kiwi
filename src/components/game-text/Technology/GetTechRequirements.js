function GetTechRequirements(techName) {

    let requiredTech = ''

    switch (techName) {
        case 'Canne à pêche':
            requiredTech = 'Outils rudimentaires'
            break;

        case 'Filet de pêche':
            requiredTech = 'Outils rudimentaires'
            break;

        default:
            break;
    }

    return requiredTech
}

export default GetTechRequirements;