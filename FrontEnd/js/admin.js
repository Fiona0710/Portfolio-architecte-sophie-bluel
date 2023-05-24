
const displayLogout = document.getElementById("logout");
const token = window.localStorage.getItem("token");
  
if (token) {
    displayLogout.textContent = "logout";
  
    const filters = document.getElementById("filters");
    setDisplayStyle(filters, 'none');

    const editImg = document.querySelector("#introduction figure");
          editImg.appendChild(createEditElement());

    const editArticle = document.querySelector("#introduction article");
          editArticle.insertBefore(createEditElement(), editArticle.firstChild);
  
    const directionEdit = document.getElementById("directionEdit");
          directionEdit.appendChild(createEditElement()); 
    displayHeadbandEditMod();
}
// si l'utilisateur ferme l'onglet ou quitte le navigateur ,il se deconnecte   
// window.addEventListener('unload', () => {
//   window.localStorage.removeItem("token");
// });

// au click sur logout l'utilisateur se deconnecte
displayLogout.addEventListener("click",() =>{
  window.localStorage.removeItem("token");
  // redirection vers la page de d'acceuil non connectée
  window.location.href = "./index.html";
}); 

/////// Modal //////

secondPageModalDisplay('none');

/*une class modal-trigger est ajouté au bouton close "X" ,
 au bouton "modifier" et sur l'overlay (background sombre)*/ 
 createCloseButton();
const elements = document.querySelectorAll("#directionEdit .positionEdit, .modal-overlay");
elements.forEach(element => {
  element.classList.add('modal-trigger');
});


//On recupére toutes les class '.modal-trigger'
const modalTriggers= document.querySelectorAll(".modal-trigger");

//boucle pour parcourir les differentes class et au click sur l'une d'elle execute la fonction toogleModal
modalTriggers.forEach(trigger => trigger.addEventListener("click", toogleModal))
  

//function qui déplace la class active sur la modale
  function toogleModal(){
    const modal = document.getElementById("modal");
    modal.classList.toggle("active")
    const modalElement = document.querySelector(".modal-wrapper");
    modalElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

//Afficher la galerie de la modale 
fetchWorksDisplayGallery("#modal-gallery");

//Au click sur le bouton ajouter une 
const buttonAddPhoto = document.querySelector('.modal-btn'); 
buttonAddPhoto.addEventListener('click', modalePageSecond);



  
   