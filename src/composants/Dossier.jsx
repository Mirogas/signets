import './Dossier.scss'; 
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FrmDossier from "./FrmDossier";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import couvertureDefaut from '../images/img-couverture-defaut.jpg';
import { formaterDate } from '../code/helper';
import { useState } from 'react';

export default function Dossier({id, titre, couleur, dateModif, couverture, supprimerDossier, modifierDossier, ajouterSignet}) {

    // états
    const [eltAncrage, setEltAncrage] = useState(null);
    const ouvert = Boolean(eltAncrage);

    const [ouvertFrm, setOuvertFrm] = useState(false);

    function gererMenu(event){
      setEltAncrage(event.currentTarget);
    }

    function gererFermer(){
      setEltAncrage(null);
    }
    function gererSupprimer(){
      // appeler la fonction de listeDossier qui gere la suppression de dossier dans firestore
      supprimerDossier(id);

    }

    function afficherFormulaireModifier(){
      setOuvertFrm(true)
      gererFermer();
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
    evt.preventDefault();
    setDropZone(true);
  }

  function gererDragLeave(evt){
    evt.preventDefault();
    setDropZone(false);
  }

  function gererDragOver(evt){
    evt.preventDefault();
  }

  function gererDrop(evt){
    evt.preventDefault();
    let url = (evt.dataTransfer.getData("URL"));
    // on voudrait aussi chercher le titre de la page

    // on appelle la methode d'ajout de signet définie dans le composant parent et passé ici en propriété
    ajouterSignet(id, url);

    setDropZone(false);
  }

  return (
    <article className={"Dossier" + (dropZone ? " dropZone" : "")} onDrop={gererDrop} onDragOver={gererDragOver} onDragLeave={gererDragLeave} onDragEnter={gererDragEnter} style={{backgroundColor: couleur}}>
      
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
        onClose={gererFermer}
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
      <FrmDossier gererActionDossier={modifierDossier} ouvert={ouvertFrm} setOuvert={setOuvertFrm} id={id} titre_p={titre} couverture_p={couverture} couleur_p={couleur} ></FrmDossier>
    </article>
  );
}