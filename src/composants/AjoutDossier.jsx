import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

export default function AjoutDossier({ouvert, setOuvert, gererAjoutDossier}){

    const [titre, setTitre] = useState("");
    const [couverture, setCouverture] = useState("");
    const [couleur, setCouleur] = useState("#000");


    const gererOuvrir = () => {
        setOuvert(true)
    }

    const gererFermer = () => {
        setTitre("");
        setCouverture("")
        setCouleur("#000");
        setOuvert(false);
    }

    function gererSoumettre(){
        // code qui gere l'ajout dans firebase

        gererAjoutDossier(titre, couverture, couleur);
        gererFermer();
    }

    return (

    <div>
      <Dialog open={ouvert} onClose={gererFermer}>
        <DialogTitle>Nouveau dossier</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choisissez un nom, image de couverture et couleur pour votre nouveau dossier de signets
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="titre"
            label="Titre du dossier"
            type="text"
            fullWidth
            variant="standard"
            onChange = {evt => setTitre(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="couverture"
            label="Image couverture du dossier"
            type="url"
            fullWidth
            variant="standard"
            onChange = {evt => setCouverture(evt.target.value)}
          />
          <TwitterPicker
            triangle = "hide"
            color = {couleur}
            colors = {["#000", "#00f", "#0ff", "#0f0", "#ff0", "#FF8633", "#f00", "#f0f"]}
            width = "auto"
            onChangeComplete = {(couleur, evt) => setCouleur(couleur.hex)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer}>Annuler</Button>
          <Button onClick={gererFermer}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
    );
};