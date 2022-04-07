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

/**
 * Ajouter un dossier pour un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecté
 * @param {object} dossier Objet représentant le dossier à ajouter 
 * @returns 
 */
export async function creer(idUtilisateur, dossier) {
    // On ajoute dateModif à l'objet dossier
    // Remarquez que nous utilisons l'objet Timestamp de Firestore pour obtenir
    // un objet date contenant le temps au serveur...
    dossier.dateModif = Timestamp.now();
    // Référence à la collection dans laquelle on veut ajouter le dossier
    let coll = collection(bdFirestore, 'signets', idUtilisateur, 'dossiers');
    // Ajout du dossier avec addDoc : retourne une promesse contenant une 
    // "référence" Firestore au document ajouté
    let refDoc = await addDoc(coll, dossier);
    // On utilise la référence pour obtenir l'objet représentant le document
    // ajouté grâce à la fonction getDoc (au singulier !) : cette fonction retourne
    // une promesse, d'où l'utilisation de 'await'...
    return await getDoc(refDoc);
}