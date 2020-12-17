//declaration constante d'url de l'appli
var BASE_URL='http://localhost:3133'
//declaration d'un créateur d'objet
/**
 * Objet permettant les appels htpp
 * @param {*} baseurl base de l'url des ressources
 */
var Crud=function name(baseurl) {
    /**
     * Permet l'appel HTTP avec XMLHTttpRequest
     * @param {*} ressourceUrl url de la ressource
     */
    function get(ressourceUrl) {
        //instanciation de XHR
        var xhr=new XMLHttpRequest();
        //ouverture de la connexion
        xhr.open('GET', baseurl+ressourceUrl);
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
        xhr.open('POST', baseurl+ressourceUrl);
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
        xhr.open('DELETE', baseurl+ressourceUrl);
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
        xhr.open('PUT', baseurl+ressourceUrl);
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
    //zone d'exposition des fonctions en public
    //pour acces depuis l'exterieur de l'instance
    this.recuperer=get;
    this.creer=post;
    this.maj=put;
    this.supprimer=remove;
}