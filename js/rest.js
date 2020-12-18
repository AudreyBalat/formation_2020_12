//declaration constante d'url de l'appli
var BASE_URL='http://localhost:3133'
//declaration d'un créateur d'objet
/**
 * Objet permettant les appels htpp
 * @param {Uri} baseurl base de l'url des ressources
 */
var Crud=function name(baseurl) {

    //zone d'exposition des fonctions en public
    //pour acces depuis l'exterieur de l'instance
    this.recuperer=_get;
    this.creer=_post;
    this.maj=_put;
    this.supprimer=_remove;
  
    /**
     * Gestion d'envoi au serveur soit put (si id present) soit post si pas d'id dans la ressource
     * @param {Uri} ressourceUrl url su lequel mettre la ressource
     * @param {Object} ressource ressource à envoyer
     * @param {Function}  callback function de callback
     */
    this.envoiRessource=function(ressourceUrl, ressource, callback){
        if(undefined !== ressource.id){
            _put(ressourceUrl+'/'+ressource.id, ressource, callback);
        }
        else{
            _post(ressourceUrl, ressource, callback);
        }
    }

    /**
     * Permet l'appel HTTP avec XMLHTttpRequest
     * @param {*} ressourceUrl url de la ressource
     */
    function _get(ressourceUrl, callback) {
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
            callback(objt);
        }
        //envoie de la requête
        xhr.send();
    }
    /**
     * Permet l'envoi en POST d'une ressource sur l'ressource Url
     * @param {Uri} ressourceUrl chemin du post
     * @param {Object} ressource data a envoyé
     * @param {Function} callback fonction de callback
     */
    function _post(ressourceUrl, ressource, callback){
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
            if(xhr.readyState < 4 || xhr.status != 201){
                return;
            }
            console.log(JSON.parse(xhr.response));
            callback(JSON.parse(xhr.response));
        }
        //transformation en JSON du contenu Objet
        xhr.send(JSON.stringify(ressource));
    }
    /**
     * Permet l'envoie du DELETE
     * @param {Uri} ressourceUrl adresse de la ressource
     * @param {Function} callback fonction à executer à la fin de la suppression
     */
    function _remove(ressourceUrl, callback) {
        //instanciation de XHR
        var xhr=new XMLHttpRequest();
        //ouverture de la connexion
        xhr.open('DELETE', baseurl+ressourceUrl);
        xhr.onreadystatechange=function(evt){
            if(xhr.readyState < 4 || xhr.status != 200){
                return;
            }
            //console.log(JSON.parse(xhr.response));
            callback();
        }
        xhr.send();
    }
    /**
     * Permet l'envoi en PUT d'une ressource sur l'ressource Url
     * @param {Uri} ressourceUrl chemin du post
     * @param {Object} ressource data a envoyé
     * @param {Function} callback function de callback
     */
    function _put(ressourceUrl, ressource, callback){
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
            if(xhr.readyState < 4 || xhr.status !== 200){
                return;
            }
            console.log(JSON.parse(xhr.response));
            callback(JSON.parse(xhr.response));
        }
        //transformation en JSON du contenu Objet
        xhr.send(JSON.stringify(ressource));
    }  
}