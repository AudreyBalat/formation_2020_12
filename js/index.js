//declaration d'une fonction anonyme
addEventListener('load', function(event) { //window.addEvent ... Comme window pas besoin  de preciser
    //usage d'une fonction
    initialisationJS('Audrey');
    //accrochage d'un ecouteur d'event sur une balise
    //event : submit
    //fonction à déclencher pour l'event -W formSubmited
    document.querySelector('form').addEventListener('submit', formSubmited); // Pas formSubmited() car sinon la fonction va s'exécuter, or elle doit s'executer uniquement lors de l'appel
})

//declaration d'une fonction
function initialisationJS(prenom){
    //definition d'une variable et affectation du contenu
    var jsload=document.querySelector('#jsload');
    //modif du style
    jsload.style.backgroundColor="RED";
    //modif du contenu
    jsload.innerHTML= 'Mon <span style="font-weight:900"> JS </span> CHARGE pour '+prenom; 
}

//fonction formSubmited
function formSubmited(evt) {
    evt.preventDefault();
    console.log('Mon formulaire est "submit"');
    //console.log(evt);
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    console.log(evt.target[2].value);
    console.log(evt.target[3].value);
    console.log(evt.target[0].value);
    //autre methode
    console.log(document.querySelector('#editor-title'));
}

/**
 * Fonction de creation d'un postit avec ajout dans la balise #list
 * @param {String} titre titre de la note
 * @param {String} date date pour la note
 * @param {String} heure heure pour la note
 * @param {String} description description de la note
 */
function createPostIt(titre, date, heure, description) {
    var postit=document.createElement('div');    
    //ajout d'une class dans la liste de class d'un element
    postit.classList.add('postit');
    //possibilité de suppression
    //postit.classList.remove('postit');
    //----------------------------------
    //creation du contenu par interpretation de la chaine et constitution d'un DOM pour cette balise
    postit.innerHTML='<div class="postit-titre">'+titre+'</div>\
    date : <span class="datatime">'+date+'</span>\
    heure : <span class="datatime">'+heure+'</span>\
    <h2>Description:</h2>'+description
    //selection de la liste postit
    var list=document.querySelector('#list');
    //ajout dans la liste de l'élement postit
    list.append(postit);
}



