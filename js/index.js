var lastID=0;
//declaration d'une fonction anonyme
addEventListener('load', function(evt) { //window.addEvent ... Comme window pas besoin  de preciser
    //usage d'une fonction
    initialisationJS('Audrey');
    //accrochage d'un ecouteur d'event sur une balise
    //event : submit
    //fonction à déclencher pour l'event -W formSubmited
    document.querySelector('form').addEventListener('submit', formSubmited); // Pas formSubmited() car sinon la fonction va s'exécuter, or elle doit s'executer uniquement lors de l'appel
    document.querySelector('form').addEventListener('reset', formReseted);
    // chargement initial des postIt - new entre parentheses pour eviter de faire un var crud = new Crud ... bien si on utilise qu'une seule fois la valeur
    (new Crud(BASE_URL)).recuperer('/postit', function(mesPostIts){
        console.log('j\'ai fini de recevoir mes postIt, voici la liste : ', mesPostIts);
        //Boucle permettant de faire une action sur chacun des postits
        mesPostIts.forEach(postit => {
            if (lastID<postit.id) {
                lastId=postit.id;
            }
            console.log(postit);
            //createPostIt(mesPostIts.title, date, heure, description)
            //createPostIt(postit.titre, postit.datatime.substring(0,10), postit.datatime.substring(11), postit.description);
            createPostItByObject(postit);
        });
    });
});

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
    //autre methode
    //console.log(document.querySelector('#editor-title'));
    var monFormulaire=document.forms['editor-form'];
    //construction de l'objet à envoyer au rest
    var postit={
        title:monFormulaire["title"].value, 
        datatime:monFormulaire['date'].value+'T'+monFormulaire['heure'].value,
        description:monFormulaire['description'].value
    };
    if(monFormulaire['id'].value!==''){
        postit.id=monFormulaire['id'].value;
    }
    //appel rest pour l'ajout dans la list et recup de l'id
    (new Crud(BASE_URL)).envoiRessource('/postit', postit, function (objSaved) {
        //evt.currentTarget.parentElement.parentElement.remove();
        if(undefined !== postit.id){
            document.querySelector('#postit-'+postit.id).remove();
        }
        createPostItByObject(objSaved);
    });
    //creation du post it dansn le db
    //createPostIt(
    //                monFormulaire['title'].value, 
    //               monFormulaire['date'].value, 
    //                monFormulaire['heure'].value, 
    //                monFormulaire['description'].value
    //            );
}

//fonction formResetet
const formReseted=(evt)=>{
    const form= document.forms['editor-form'];
  for(let i=0 ; i < form.length ; i++ ){
      if (form[i].type !== 'reset' && form[i].type !== 'submit'){
          input.value='';
      }
  }
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

/**
 * Fonction de création d'un postot avvec ajuor dans la balise dic#list par le biais d'un objet postit comple
 * @param {Object} postit object postIt instancié
 */
function createPostItByObject(postitInput) {
    var postit=document.createElement('div');  
    //creation de l'id de balise en liens avec l'id du postit dans le rest pour facilité la suppresion 
    postit.id='postit-'+postitInput.id;
    //ajout d'une class dans la liste de class d'un element
    postit.classList.add('postit');
    postit.addEventListener('click', putinformclickedpostit);
    //possibilité de suppression
    //postit.classList.remove('postit');
    //----------------------------------
    //creation du contenu par interpretation de la chaine et constitution d'un DOM pour cette balise
    postit.innerHTML='<div class="close"><img src="img/close.png"/></div>\
    <div class="postit-title">'+postitInput.title+'</div>\
    date : <span class="datatime postit-date">'+postitInput.datatime.substring(0,10)+'</span>\
    heure : <span class="datatime postit-heure">'+postitInput.datatime.substring(11)+'</span>\
    <h2>Description:</h2><div class="postit-description">'+postitInput.description+'</div>'
    //selection de .close img à partir de postit + add listener sur event click, delete
    postit.querySelector('.close img').addEventListener('click', deletePostIt);
   
    //selection de la liste postit
    var list=document.querySelector('#list');
    //ajout dans la liste de l'élement postit
    list.append(postit);
}

// suppression d'un post it
function deletePostIt(evt) {
    evt.stopPropagation();
    //console.log('evenement lié à la suppression', evt);
    //Supprime la clases postit (on est sur l'image)
    //evt.currentTarget.parentElement.parentElement.remove();
    var domPostItId=evt.path[2].id.substring(7);
    (new Crud(BASE_URL)).supprimer('/postit/'+domPostItId, function () {
        //evt.currentTarget.parentElement.parentElement.remove();
        evt.path[2].remove();
    })
}
//fonction d'element tout en minuscule
function putinformclickedpostit(evt) {
    console.log('j\'ai clicker sur un postit', evt);
    var dompostit=evt.currentTarget ;
    console.log(
        dompostit.id.substring(7),
        dompostit.querySelector('.postit-title').innerText,
        dompostit.querySelector('.postit-date').innerText,
        dompostit.querySelector('.postit-heure').innerText,
        dompostit.querySelector('.postit-description').innerText
    )
    document.forms['editor-form']['id'].value=dompostit.id.substring(7);
    document.forms['editor-form']['title'].value=dompostit.querySelector('.postit-title').innerText;
    document.forms['editor-form']['date'].value=dompostit.querySelector('.postit-date').innerText;
    document.forms['editor-form']['heure'].value=dompostit.querySelector('.postit-heure').innerText;
    document.forms['editor-form']['description'].value=dompostit.querySelector('.postit-description').innerText;
}
/**
 * fonction pour recperer les notes a partir de la valeur d'un id lasId
 */
const pullingFunction=()=>{
    (new Crud(BASE_URL)).recuperer('/postit?id_gte='+(lastID+1), (listeDesPostIt)=> {
        listeDesPostIt.map((element)=>{
            lastID=(lastID<element.id?element.id:lastID);
            createPostItByObject(element);
        });
    });
}



