import stone                from '../assets/images/resources/stone.png';
import wood                 from '../assets/images/resources/wood.png';

import pineForest           from '../assets/images/regions/pineForest.png';
import pineLake             from '../assets/images/regions/pineLake.png';
import undiscovered         from '../assets/images/regions/undiscovered.png';

import bridge               from '../assets/images/obstacles/bridge.png';
import mountains            from '../assets/images/obstacles/mountains.png';
import sea                  from '../assets/images/obstacles/sea.png';

import rocks                from '../assets/images/zones/rocks.png';
import tree                 from '../assets/images/zones/trees.png';

import preoccupationPoint   from '../assets/images/preoccupation-point.png';

const IMAGES = [[stone, wood], [pineForest, pineLake, undiscovered], [bridge, mountains, sea], [rocks, tree], [preoccupationPoint]]

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
        case 'pineForest':
            category = 1
            imageNumber = 0
            break; 
        case 'pineLake':
            category = 1
            imageNumber = 1
            break; 
        case 'undiscovered':
            category = 1
            imageNumber = 2
            break; 
        case 'bridge':
            category = 2
            imageNumber = 0
            break;
        case 'mountains':
            category = 2
            imageNumber = 1
            break;
        case 'sea':
            category = 2
            imageNumber = 2
            break; 
        case 'rocks':
            category = 3
            imageNumber = 0
            break; 
        case 'tree':
            category = 3
            imageNumber = 1 
            break;
        case 'preoccupationPoint':
            category = 4
            imageNumber = 0
            break;
        default:
            category = 4
            imageNumber = 0
            break;      
    }
    
    return IMAGES[category][imageNumber];
}

export default GetImage