
const displayLogout = document.getElementById("logout");
const token = window.localStorage.getItem("token");
  
if (token) {
    displayLogout.textContent = "logout";
  
    const filters = document.getElementById("filters");
          filters.style.display = "none";
  
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

/////// Modal facon Ecole du dev //////

createCloseButton();
const btnEditWorks = document.querySelector("#directionEdit .positionEdit"); 
btnEditWorks.classList.add("modal-trigger")
const modalContainer= document.getElementById("modal1");
const modalTriggers= document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => 
  trigger.addEventListener("click", toogleModal))


  function toogleModal(){
    modalContainer.classList.toggle("active")
  }
/////////Modal facon Grafikart///////

// createCloseButton();
// Récuperation de la modale et application d'attributs   
// const target= document.getElementById("modal1");
//             target.setAttribute("aria-hidden", "true");
//             target.setAttribute("role", "dialog");
//             target.setAttribute("aria-labelledby", "modal-title");

// let modal = null;

// const openModal = function (e){
//       e.preventDefault();
//       target.style.display = null;
//       target.removeAttribute('aria-hidden');
//       target.setAttribute('aria-modal','true');      
//       modal = target;
//       modal.addEventListener('click', closeModal);
//       modal.querySelector(".modal-close").addEventListener('click',closeModal);
//       modal.querySelector(".modal-stop").addEventListener('click',stopPropagation);
// }; 
    
// const closeModal = function (e){
//   if (modal === null) return;
//       e.preventDefault();
//       modal.style.display ="none";
//       modal.setAttribute('aria-hidden', "true");
//       modal.removeAttribute('aria-modal');
//       modal.removeEventListener('click', closeModal);
//       modal.querySelector(".modal-close").removeEventListener('click',closeModal);
//       modal.querySelector(".modal-stop").removeEventListener('click',stopPropagation);
//       modal = null;

// }; 

// const stopPropagation = function (e){
//   e.stopPropagation();
// };

// const btnEditWorks = document.querySelector("#directionEdit .positionEdit");
//       btnEditWorks.addEventListener("click",openModal);

    //Afficher la galerie de la modale 
fetchWorks()
  .then(dataWork => {
    const modalGallery = document.getElementById("modal-gallery");

      /*Parcours de la liste de travaux récupérés, 
      et pour chaque travail, création de l'élément HTML correspondant en y incluant son image, 
      et sa catégorie*/
    dataWork.forEach(jsonWork => {
      modalGallery.innerHTML +=`<figure class="work" data-category="${jsonWork.categoryId}">
                                  <img src="${jsonWork.imageUrl}" alt="image du projet">
                                  <figcaption>éditer</figcaption>
                                </figure>`;
    });     

  });    

     