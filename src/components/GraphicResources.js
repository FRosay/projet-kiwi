import stone                from '../assets/images/resources/stone.png';
import wood                 from '../assets/images/resources/wood.png';
import minerals             from '../assets/images/resources/minerals.png';
import food                 from '../assets/images/resources/food.png';

import crystalCave             from '../assets/images/regions/crystalCave.png';
import deepLake             from '../assets/images/regions/deepLake.png';
import pineForest           from '../assets/images/regions/pineForest.png';
import pineLake             from '../assets/images/regions/pineLake.png';

import rocks                from '../assets/images/zones/rocks.png';
import tree                 from '../assets/images/zones/trees.png';

import preoccupationPoint   from '../assets/images/preoccupation-point.png';

import techFishingCane      from '../assets/images/technologies/fishingCane.png';
import techFishingNet      from '../assets/images/technologies/fishingNet.png';
import techFishingBoat      from '../assets/images/technologies/fishingBoat.png';

const IMAGES =  [[stone, wood, minerals, food],
[crystalCave, deepLake, pineForest, pineLake],
[rocks, tree],
[preoccupationPoint],
[techFishingCane, techFishingNet, techFishingBoat]]

function GetImage(imageName) {

    let category
    let imageNumber

    switch (imageName) {
        case 'stone':
            category = 0
            imageNumber = 0
            break;
        case 'wood':
            category = 0
            imageNumber = 1
            break;
        case 'minerals':
            category = 0
            imageNumber = 2
            break;
        case 'food':
            category = 0
            imageNumber = 3
            break;

        case 'crystalCave':
            category = 1
            imageNumber = 0
            break;
        case 'deepLake':
            category = 1
            imageNumber = 1
            break;
        case 'pineForest':
            category = 1
            imageNumber = 2
            break;
        case 'pineLake':
            category = 1
            imageNumber = 3
            break;

          case 'rocks':
              category = 2
              imageNumber = 0
              break;
            case 'tree':
                category = 2
                imageNumber = 1
                break;

        case 'preoccupationPoint':
            category = 3
            imageNumber = 0
            break;

        case 'techFishingCane':
            category = 4
            imageNumber = 0
            break;
        case 'techFishingNet':
            category = 4
            imageNumber = 1
            break;
        case 'techFishingBoat':
            category = 3
            imageNumber = 2
            break;

        default:
            category = 3
            imageNumber = 0
            console.log('what is '+imageName+' ?')
            break;
    }

    return IMAGES[category][imageNumber];
}

export default GetImage
