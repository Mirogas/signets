import './ListeDossiers.scss';
import Dossier from './Dossier';
import { useEffect } from 'react';
import * as dossierModele from '../code/dossier-modele';

export default function ListeDossiers({utilisateur, dossiers, setDossiers}) {
  // console.log("Objet utilisateur retourné par le Provider GoogleAuth : ", utilisateur);


  // Lire les dossiers (de l'utilisateur connecté) dans Firestore
  useEffect(
    () => dossierModele.lireTout(utilisateur.uid).then(
      lesDossiers => setDossiers(lesDossiers)
    )
    , [utilisateur, setDossiers]
  );

  function supprimerDossier(idDossier){
    // utiliser le modèle des dossiers pour supprimer le dossier dans firestore
    dossierModele.supprimer(utilisateur.uid, idDossier).then(
      () => setDossiers(dossiers.filter(
        dossier => dossier.id !== idDossier
      ))
    );
  }

  function modifierDossier(idDossier, nvTitre, nvCouverture, nvCouleur){
    // ouvrir le formulaire de modification du dossier
    const objectModif = {
      couleur:  nvCouleur,
      couverture: nvCouverture,
      titre: nvTitre
    };

    dossierModele.modifier(utilisateur.uid, idDossier, objectModif).then(
      () => setDossiers(dossiers.map(
        dossier => {
          if(dossier.id === idDossier){
            dossier.couverture = nvCouverture;
            dossier.couleur = nvCouleur;
            dossier.titre = nvTitre;
          }
          return dossiers;
        }
      ))
    );
  }

  function ajouterSignet(idDossier, url){


  }

  return (
    <ul className="ListeDossiers">
      {
        dossiers.map( 
          // Remarquez l'utilisation du "spread operator" pour "étaler" les 
          // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
          // fléchée dans les props du composant 'Dossier' !!
          dossier => <li key={dossier.id}><Dossier  {...dossier} supprimerDossier={supprimerDossier} modifierDossier={modifierDossier} ajouterSignet={ajouterSignet} /></li>
        )
      }
    </ul>
  );
}