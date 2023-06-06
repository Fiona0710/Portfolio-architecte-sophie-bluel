
// Récupération des données de l'API "works"
  fetchWorks()
  .then(dataWork => {

    // Affichage des filtres
    displayFilters(dataWork);
    
    // Affichage des projets dans la galerie
    fetchWorksDisplayGallery(".gallery");
        
    //Récupération de tous les filtres  
    const buttonFilters = document.querySelectorAll(".filter"); 
    const filterAll = buttonFilters[0];

    //au click sur le filtre "Tous" , tout les projets s'affichent
    filterAll.addEventListener("click",showAllWorks);

    /*Parcours de tous les filtres, à l'exception du filtre "Tous",
    et pour chaque filtre, ajout d'un événement */
    buttonFilters.forEach(buttonFilter => {
            if (buttonFilter !== filterAll) {
                buttonFilter.addEventListener("click", (event) => {
                    filterWorks(event);
                });
            }
       });
       
});

/******** Fonctions pour l'affichage des filtres et la galerie de la page d'acceuil ***********/

// Fonction pour afficher les filtres 
function displayFilters(dataWork){
  const filters = document.getElementById("filters");

 // Ajout du filtre "Tous" en tant que premier élément de la liste des filtres
  filters.innerHTML += `<li class="filter" id="0">Tous</li>`;

  // Création d'une liste de categories en triant les catégories des différents travaux récupérées
  const categoryList = Array.from(new Set(dataWork.map(jsonWork => jsonWork.categoryId )));
  
  /* find() permet de trouver le premier élément dans le tableau dataWork
   qui a le meme categoryId que le categoryId en cours.*/
  categoryList.forEach(categoryId => {      
      const categoryName = dataWork.find(work => work.categoryId === categoryId).category.name;                 
      filters. innerHTML += `<li class="filter" id="${categoryId}">${categoryName}</li>`;
  });
  
}

// fonction pour afficher la gallery de la page d'acceuil ou de la modale
function fetchWorksDisplayGallery(targetElement) {

return fetchWorks()

  .then(dataWork => {
    const galleryElement = document.querySelector(targetElement);

    dataWork.forEach(jsonWork => {
      const figure = document.createElement('figure');
      figure.classList.add('work');
      figure.dataset.category = jsonWork.categoryId;

      const img = document.createElement('img');
      img.src = jsonWork.imageUrl;
      img.alt = 'image du projet';

      figure.appendChild(img);

      if (targetElement === '.gallery') {
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = jsonWork.title;
        figure.appendChild(figcaption);
      }

      if (targetElement === '#modal-gallery') {
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = 'éditer';
        figure.appendChild(figcaption);
        
        const workId = jsonWork.id;
        displayDeleteButton(figure, workId);
        displayMoveButtonHover(figure); 
      }

      galleryElement.appendChild(figure);
    });
  });
}


// Supprime la classe "filter_active" de tous les filtres
function deleteActiveClass(){
  const buttonFilters = document.querySelectorAll(".filter");
  buttonFilters.forEach(buttonFilter => buttonFilter.classList.remove("filter_active"));
};

//Fonction afficher tous les travaux au clic sur le fitre 'Tous'
function showAllWorks(){
  //Récupération de tous les filtres et de tous les travaux 
  const buttonFilters = document.querySelectorAll(".filter");
  const filterAll = buttonFilters[0];
  const works = document.querySelectorAll(".work");
  // Affiche tous les projets
  works.forEach(work => work.style.display = "block");
  deleteActiveClass();
  // Ajoute la classe "filter_active" au filtre "Tous"
  filterAll.classList.add("filter_active");   
};

// Fonction pour filtrer par categorie et afficher les projets 
function filterWorks(event){
  const buttonFilterIdValue = event.target.getAttribute("id");   
     deleteActiveClass();
     // Ajoute la classe "filter_active" au filtre actuel
     event.target.classList.add("filter_active");
     // Récuperation de tous les travaux
     const works = document.querySelectorAll(".work");
     // Parcours tous les travaux 
     works.forEach(work => {
         // Si le travail correspond à la catégorie sélectionnée
         work.style.display = work.dataset.category === buttonFilterIdValue ? "block" : "none";
     }); 
       
};







  

  

  


         

          
