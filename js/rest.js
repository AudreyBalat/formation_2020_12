/**
 * Permet l'appel HTTP avec XMLHTttpRequest
 * @param {*} ressourceUrl url de la ressource
 */
function get(ressourceUrl) {
    //instanciation de XHR
    var xhr=new XMLHttpRequest();
    //ouverture de la connexion
    xhr.open('GET', 'http://localhost:3133'+ressourceUrl);
    //tache à effectuer à chaquechangement de readstate (passa d'une étape de reception)
    // 1 -> open 2 -> send 3 -> en crours de recetption 4 -> fin de reception
    xhr.onreadystatechange=function(evt){
        var objt= JSON.parse(evt.currentTarget.response);
        console.log(objt);
    }
    //envoie de la requête
    xhr.send();
}
get('/postit/1');