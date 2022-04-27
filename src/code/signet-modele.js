
import { bdFirestore } from "./init";
import { getDocs, query, orderBy, collection, addDoc, getDoc, deleteDoc, updateDoc, doc} from "firebase/firestore";

export async function creer(uid, idDossier, url){
        // Référence au document dans lequel on veut ajouter le signet
    let coll = collection(bdFirestore, 'signets', uid, 'dossiers', idDossier);
    // modifier le document pour ajouter le signet
    
    return await updateDoc(docRef, {});

}