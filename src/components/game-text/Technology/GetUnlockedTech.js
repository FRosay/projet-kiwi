function GetUnlockedTech(techName) {

    let unlockedTechs = []

    switch (techName) {
        case 'Outils rudimentaires':
            unlockedTechs = ['Canne à pêche', 'Filet de pêche']
            break;

        default:
            break;
    }

    return unlockedTechs
}

export default GetUnlockedTech;