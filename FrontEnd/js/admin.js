
const displayLogout = document.getElementById("logout");
const token = window.localStorage.getItem("token");

/************************* Fonctions pour rajouter des élèments coté admin ***********************/

// fonction pour creer le bouton et l'icon "modifier"
function createEditElement() {
  const displayEdit = createButtonElement(['positionEdit'],"modifier");
 
  const iconEdit = createIconElement("fa-regular", "fa-pen-to-square");
  
  displayEdit.insertBefore(iconEdit, displayEdit.firstChild);
  return displayEdit;
};

// Fonction pour afficher la bande noir "mode édition"
function displayHeadbandEditMod(){
  const header = document.querySelector("header");
  header.style.marginTop = "100px";

  const headerH1 = document.querySelector("header h1");
  const divBlackHeadband = document.createElement("div");
  divBlackHeadband.id = "blackHeadband";
  header.insertBefore(divBlackHeadband, headerH1);
 
  const divEditMod =createButtonElement(['positionEdit'],"Mode édition");
  divEditMod.style.paddingTop = "0";
  divEditMod.insertBefore(createEditElement().firstChild, divEditMod.firstChild);

  const publishChangesButton = createButtonElement (['publish-changes-button'],"publier les changements");

  divBlackHeadband.appendChild(divEditMod);
  divBlackHeadband.appendChild(publishChangesButton);
};

/**********************************************************************************************/
  
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
window.addEventListener('unload', () => {
  window.localStorage.removeItem("token");
});

// au click sur logout l'utilisateur se deconnecte
displayLogout.addEventListener("click",() =>{
  window.localStorage.removeItem("token");
  // redirection vers la page de d'acceuil non connectée
  window.location.href = "./index.html";
}); 







  
   