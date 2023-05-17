
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

    const editWorks = document.querySelector("#directionEdit .positionEdit");
    editWorks.addEventListener("click", () =>{
      console.log(editWorks);
    });
    

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
               