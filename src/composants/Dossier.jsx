import './Dossier.scss'; 
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import CloseIcon from '@mui/icons-material/Close';

import FrmDossier from "./FrmDossier";
import * as signetModele from "../code/signet-modele";

import couvertureDefaut from '../images/img-couverture-defaut.jpg';
import { formaterDate } from '../code/helper';
import { useState, useContext} from 'react';
import { UtilisateurContext } from './Appli';

export default function Dossier({id, titre, couleur, dateModif, couverture, supprimerDossier, modifierDossier, top3}) {
    
    //état de la carte
    const [carteActive, setCarteActive] = useState(false);

    // identifiant de l'utilisateur
    const utilisateur = useContext(UtilisateurContext);
    const uid = utilisateur.id;

    // états des signets dans ce dossier
    const [signets, setSignets] = useState(top3 || []);

    // états du menu contextuel
    const [eltAncrage, setEltAncrage] = useState(null);
    const ouvert = Boolean(eltAncrage);

    // etat du formulaire de modification
    const [ouvertFrm, setOuvertFrm] = useState(false);
    

    function gererMenu(event){
      setEltAncrage(event.currentTarget);
      // stopper le bubbling de l'evenement
      event.stopPropagation();
    }

    function gererFermerMenu(event){
      setEltAncrage(null);

      // stopper le bubbling de l'evenement
      event.stopPropagation();
    }

    function gererSupprimer(event){
      // appeler la fonction de listeDossier qui gere la suppression de dossier dans firestore
      supprimerDossier(id);
      gererFermerMenu(event);

      // stopper le bubbling de l'evenement
      event.stopPropagation();
    }

    function afficherFormulaireModifier(event){
      // ouvrir le formulaire de modif de dossier
      setOuvertFrm(true)

      gererFermerMenu(event);

      // stopper le bubbling de l'evenement
      event.stopPropagation();
    }
  
  // tester si l'url dans la variable couverture est valide
  let urlCouverture;
  try{
    urlCouverture = new URL(couverture);
  }
  catch(e){
    couverture = couvertureDefaut;
  }


  // état zone de lachage de la souris
  const [dropZone, setDropZone]=useState(false);

  function gererDragEnter(evt){
    evt.dataTransfer.effectAllowed = 'link';
    evt.preventDefault();
    setDropZone(true);
  }

  function gererDragLeave(evt){
    setDropZone(false);
  }

  function gererDragOver(evt){
    evt.preventDefault();
  }

  function gererDrop(evt){
    evt.preventDefault();
    setDropZone(false);
    let url = (evt.dataTransfer.getData("URL"));
    // on voudrait aussi chercher le titre de la page
    // chercher l'url par fetch() et lire le contenu d ela page web et selectionner la balise title et son innerText
    fetch("https://cors-anywhere.herokuapp.com/" + url).then(
      reponse => reponse.text()).then(

      chaineDoc =>{
        const doc = DOMParser().parseFromString(chaineDoc, "text/html");
        const titre = doc.querySelectorAll("title")[0];

      }
    )

    // on appelle la methode d'ajout de signet définie dans le composant parent et passé ici en propriété
    ajouterSignet(id, url, titre.innerText);
    
    // pour que ça marche sans le serveur test pour le truc CORS
    //  ajouterSignet(id, url, titre.innerText);


  }

  function ajouterSignet(idDossier, url, titreUrl){
    const derniers3 = [...signets, {adresse: url, titre: titreUrl}].slice(-3);
    signetModele.creer(uid, idDossier, derniers3).then(
      () => setSignets(derniers3)
    )
  }

  return (
    <article className={"Dossier" + (dropZone ? " dropZone" : "") + (carteActive ? " actif" : "")} onDrop={gererDrop} onDragOver={gererDragOver} onDragLeave={gererDragLeave} onDragEnter={gererDragEnter} style={{backgroundColor: couleur}}>
      
      <div className="carte">

        <div className="endroit" onClick={() => setCarteActive(true)}>

          <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
              <SortIcon />
          </IconButton>

          <div className="couverture">
            <img src={couverture || couvertureDefaut} alt={titre}/>
          </div>

          <div className="info">
            <h2>{titre}</h2>
            <p>Modifié : {formaterDate(dateModif)}</p>
          </div>

          <IconButton onClick={gererMenu} className="modifier" aria-label="modifier" size="small">
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="menu-contextuel-dossier"
            anchorEl={eltAncrage}
            open={ouvert}
            onClose={gererFermerMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={afficherFormulaireModifier}>Modifier</MenuItem>
            <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
          </Menu>
        </div>

        <div className="envers">
          <ButtonUnstyled onClick={()=> setCarteActive(false)} className="tourner-carte" size="small">
              <CloseIcon />
          </ButtonUnstyled>
          {
            signets.map(
              (signet,position) => <a key={position} href={signet.adresse} target="blank">{signet.titre}</a>
            )
          }
        </div>
      </div>
      
      <FrmDossier gererActionDossier={modifierDossier} ouvert={ouvertFrm} setOuvert={setOuvertFrm} id={id} titre_p={titre} couverture_p={couverture} couleur_p={couleur} ></FrmDossier>
    </article>
  );
}