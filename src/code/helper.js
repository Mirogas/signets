/**
 * retourner une date dans le format français suivant
 * 10 Octobre 2003
 * @param {Number} tsSecondes timeStamp en secondes
 * @returns {String} chaine représentant le timestamp dans le format spécifié
 * 
 */

export function formaterDate(tsSecondes){
    let dateJs = new Date(tsSecondes * 1000);
    let nomDesMois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return `${dateJs.getDate()} ${nomDesMois[dateJs.getMonth()]} ${dateJs.getFullYear()}`;
}