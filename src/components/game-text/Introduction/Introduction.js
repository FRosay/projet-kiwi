import React, { useState } from 'react';
import StartingLocation from './StartingLocation.js'


function Introduction() {

    const [page, setPage] = useState(1)

    switch (page) {
        case 1:
            return(
                <div>
                    <p>Faille dans le système des moteurs. Etat critique.</p> 
        
                    <p>Annulation de l’ordre de mission CNP-006. Nouvelle priorité : sauvegarder les vies humaines à bord.</p>
                    
                    <p>Recherche d’un plan de secours. Analyse des planètes les plus proches... 
                    Planète habitable détectée. Probabilité de la découverte : 0,0001%. 
                    Possibilité d’utiliser une dernière fois la propulsion des moteurs pour placer le vaisseau en orbite descendante rapide.</p> 
                    
                    <p>Probabilité de réussite de la manœuvre : 94,33%. <br />
                    Probabilité de survie immédiate des colons : 15,12% par individu. <br />
                    Probabilité d’endommagement de l’IA-Mère : 96,05%. <br />
                    Probabilité de survie à long terme des colons : 0,28%.</p>
                    
                    <p>Recherche d’une solution moins risquée…</p> 
                    
                    <p>Probabilité d’établir un contact avec un vaisseau équipé pour les secours : 0%. <br />
                    Probabilité de survie des colons en cas de changement de trajectoire vers un monde habité : 0%. <br />
                    Probabilité de résoudre le dysfonctionnement des machines : 0%.</p>
                    
                    <p>Enclenchement de la poussée vers Planète Inconnue.</p>
        
                    <br />
        
                    <button onClick={() => setPage(page+1)}>Suivant</button>
                </div>
            )
        case 2:
            return(
                <div>
                    <p>Planète en approche rapide. Probabilité de survie des colons en baisse.</p> 
        
                    <p>Possibilité d'influer légèrement la trajectoire grâce aux systèmes de vol intra-planétaires. 
                    <br />
                    Détermination d'un point de chute nécessaire.</p>
                    
                    <p>Analyse rapide de la planète. Points de chute atteignables listés. Avantages respectifs déterminés.</p> 
                    
                    <p>Choix du lieu d'arrivée en cours...</p>
        
                    <br />
        
                    <button onClick={() => setPage(page+1)}>Suivant</button>
                </div>
            )
        case 3:
            return(
                <div>
                    <p>Caractéristiques du lieu d'atterrissage envisagé :</p> <br />

                    <StartingLocation />
                </div>
            )
        default:
            return(
                <div>
                    <p>Erreur dans le numéro de page.</p>
                </div>
            )
    }
}

export default Introduction;
