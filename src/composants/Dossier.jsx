import './Dossier.scss'; 
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import couvertureDefaut from '../images/img-couverture-defaut.jpg';
import { formaterDate } from '../code/helper';

export default function Dossier({id, titre, couleur, dateModif, couverture}) {

  // tester si l'url dans la variable couverture est valide
  // let urlCouverture = new URL(couverture);
  // if(!urlCouverture){
  //   couverture=couvertureDefaut;
  // }

  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article className="Dossier" style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
        <img src={couverture || couvertureDefaut} alt={titre}/>
      </div>
      <div className="info">
        <h2>{titre}</h2>
        <p>Modifié : {formaterDate(dateModif)}</p>
      </div>
      <IconButton className="modifier" aria-label="modifier" size="small">
        <MoreVertIcon />
      </IconButton>
    </article>
  );
}