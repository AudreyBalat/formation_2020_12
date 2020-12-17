//declaration d'une fonction anonyme
addEventListener('load', function(event) { //window.addEvent ... Comme window pas besoin  de preciser
    //usage d'une fonction
    initialisationJS('Audrey');
    //accrochage d'un ecouteur d'event sur une balise
    //event : submit
    //fonction à déclencher pour l'event -W formSubmited
    document.querySelector('form').addEventListener('submit', formSubmited); // Pas formSubmited() car sinon la fonction va s'exécuter, or elle doit s'executer uniquement lors de l'appel
    // chargement initial des postIt - new entre parentheses pour eviter de faire un var crud = new Crud ... bien si on utilise qu'une seule fois la valeur
    (new Crud(BASE_URL)).recuperer('/postit', function(mesPostIts){
        console.log('j\'ai fini de recevoir mes postIt, voici la liste : ', mesPostIts);
        //Boucle permettant de faire une action sur chacun des postits
        mesPostIts.forEach(postit => {
            console.log(postit);
            //createPostIt(mesPostIts.title, date, heure, description)
            createPostIt(postit.titre, postit.datatime.substring(0,10), postit.datatime.substring(12), postit.description);
        });
    });
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
    //console.log(document.querySelector('#editor-title'));
    var monFormulaire=document.forms['editor-form'];
    createPostIt(
                    monFormulaire['title'].value, 
                    monFormulaire['date'].value, 
                    monFormulaire['heure'].value, 
                    monFormulaire['description'].value
                );
}

/**
 * Fonction de creation d'un postit avec ajout dans la balise #list
 * @param {String} title titre de la note
 * @param {String} date date pour la note
 * @param {String} heure heure pour la note
 * @param {String} description description de la note
 */
function createPostIt(title, date, heure, description) {
    var postit=document.createElement('div');    
    //ajout d'une class dans la liste de class d'un element
    postit.classList.add('postit');
    //possibilité de suppression
    //postit.classList.remove('postit');
    //----------------------------------
    //creation du contenu par interpretation de la chaine et constitution d'un DOM pour cette balise
    postit.innerHTML='<div class="close"><img src="img/close.png"/></div>\
    <div class="postit-titre">'+title+'</div>\
    date : <span class="datatime">'+date+'</span>\
    heure : <span class="datatime">'+heure+'</span>\
    <h2>Description:</h2>'+description
    //selection de .close img à partir de postit + add listener sur event click, delete
    postit.querySelector('.close img').addEventListener('click', deletePostIt);
   
    //selection de la liste postit
    var list=document.querySelector('#list');
    //ajout dans la liste de l'élement postit
    list.append(postit);
}

// suppression d'un post it
function deletePostIt(evt) {
    //console.log('evenement lié à la suppression', evt);
    //Supprime la clases postit (on est sur l'image)
    evt.currentTarget.parentElement.parentElement.remove();

}



