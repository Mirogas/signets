import { bdFirestore } from "./init";
import { getDocs, collection, addDoc, Timestamp, getDoc} from "firebase/firestore";

/**
 * Obtenir tous les dossiers d'un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecté
 * @returns {Promise<any[]>} Promesse avec le tableau des dossiers lorsque complétée
 */
export async function lireTout(idUtilisateur) {
    return getDocs(collection(bdFirestore, 'signets', idUtilisateur, 'dossiers')).then(
        res => res.docs.map(doc => ({id: doc.id, ...doc.data()}))
    );
}

// Ajouter un dossier
export async function creer(idUtilisateur, dossier){
    // ajouter dateModif a l'objet dossier
    dossier.dateModif = Timestamp.fromDate(new Date);

    // créer un chemin vers la collection de dossier de l'utilisateur
    let coll = collection(bdFirestore, "signets", idUtilisateur, "dossiers");
    // ajouter le dossier à la collection
    let refDoc = await addDoc(coll, dossier);
    return await getDoc(refDoc);
}