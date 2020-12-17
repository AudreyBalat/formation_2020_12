//declaration chemin d'accès
var BASE_URL='http://localhost:3133'
/**
 * Permet l'appel HTTP avec XMLHTttpRequest
 * @param {*} ressourceUrl url de la ressource
 */
function get(ressourceUrl) {
    //instanciation de XHR
    var xhr=new XMLHttpRequest();
    //ouverture de la connexion
    xhr.open('GET', BASE_URL+ressourceUrl);
    //tache à effectuer à chaquechangement de readstate (passa d'une étape de reception)
    // 1 -> open 2 -> send 3 -> en crours de recetption 4 -> fin de reception
    xhr.onreadystatechange=function(evt){
        if(evt.currentTarget.readyState<XMLHttpRequest.DONE){
            return;
        }
        var objt=JSON.parse(evt.currentTarget.response);
        console.log(objt);
    }
    //envoie de la requête
    xhr.send();
}
/**
 * Permet l'envoi en POST d'une ressource sur l'ressource Url
 * @param {*} ressourceUrl chemin du post
 * @param {*} ressource data a envoyé
 */
function post(ressourceUrl, ressource){
    //instanciation de XHR
    var xhr=new XMLHttpRequest();
    //ouverture de la connexion
    xhr.open('POST', BASE_URL+ressourceUrl);
    //instanciation des headers
    //specification du type contenu
    xhr.setRequestHeader('Content-Type', 'application/json');
    //specification de ce qui est attendu en retour
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange=function(evt){
        if(xhr.readyState<4){
            return;
        }
        console.log(JSON.parse(xhr.response));
    }
    //transformation en JSON du contenu Objet
    xhr.send(JSON.stringify(ressource));
}
/**
 * Permet l'envoie du DELETE
 * @param {*} ressourceUrl 
 */
function remove(ressourceUrl) {
    //instanciation de XHR
    var xhr=new XMLHttpRequest();
    //ouverture de la connexion
    xhr.open('DELETE', BASE_URL+ressourceUrl);
    xhr.onreadystatechange=function(evt){
        if(xhr.readyState<4){
            return;
        }
        console.log(JSON.parse(xhr.response));
    }
    xhr.send();
}
/**
 * Permet l'envoi en PUT d'une ressource sur l'ressource Url
 * @param {*} ressourceUrl chemin du post
 * @param {*} ressource data a envoyé
 */
function put(ressourceUrl, ressource){
    //instanciation de XHR
    var xhr=new XMLHttpRequest();
    //ouverture de la connexion
    xhr.open('PUT', BASE_URL+ressourceUrl);
    //instanciation des headers
    //specification du type contenu
    xhr.setRequestHeader('Content-Type', 'application/json');
    //specification de ce qui est attendu en retour
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange=function(evt){
        if(xhr.readyState<4){
            return;
        }
        console.log(JSON.parse(xhr.response));
    }
    //transformation en JSON du contenu Objet
    xhr.send(JSON.stringify(ressource));
}
get('/postit/1');