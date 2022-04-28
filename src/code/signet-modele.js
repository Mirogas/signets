
import { bdFirestore } from "./init";
import { updateDoc, doc} from "firebase/firestore";


/**
 * Ajoute un signet en recréant le tableau des top3 dans le dossier identifié
 * @param {String} uid id de l'utilisateur
 * @param {String} idDossier id du dossier identifié
 * @param {Object[]} derniers3 objet contenant max3 url
 * @returns {Promise<void>} Promesse sans paramètres une fois que la requetes est finie
 */
export async function creer(uid, idDossier, derniers3){
        // Référence au document dans lequel on veut ajouter le signet
    let docRef = doc(bdFirestore, 'signets', uid, 'dossiers', idDossier);
    // modifier le document pour ajouter le signet
    
    return await updateDoc(docRef, {top3: derniers3});  

}