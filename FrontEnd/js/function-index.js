// Fonction pour afficher les filtres 
function displayFilters(dataWork){
    const filters = document.getElementById("filters");

    // Création d'une liste de filtres en triant les catégories des différents travaux récupérées
    const filterList = Array.from(new Set(dataWork.map(jsonWork => jsonWork.categoryId )));

    // Ajout du filtre "Tous" en tant que premier élément de la liste des filtres
    filters.innerHTML += `<li class="filter" id="0">Tous</li>`;

    /* find() permet de trouver le premier élément dans le tableau dataWork
     qui a le meme categoryId que le categoryId en cours.*/
    filterList.forEach(categoryId => {      
        const categoryName = dataWork.find(work => work.categoryId === categoryId).category.name;                 
        filters. innerHTML += `<li class="filter" id="${categoryId}">${categoryName}</li>`;
    });
}


// Fonction pour afficher la gallerie
function displayGallery(dataWork){
    const gallery = document.querySelector(".gallery");

    /*Parcours de la liste de travaux récupérés, 
    et pour chaque travail, création de l'élément HTML correspondant en y incluant son image,
    son titre et sa catégorie*/
    dataWork.forEach(jsonWork => {
        gallery.innerHTML += `<figure class="work" data-category="${jsonWork.categoryId}">
                                <img src="${jsonWork.imageUrl}" alt="image du projet">
                                <figcaption>${jsonWork.title}</figcaption>
                               </figure>`;
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
function filterWorks(buttonFilter){
    const buttonFilterIdValue = buttonFilter.getAttribute("id");   
       deleteActiveClass();
       // Ajoute la classe "filter_active" au filtre actuel
       buttonFilter.classList.add("filter_active");
       // Récuperation de tous les travaux
       const works = document.querySelectorAll(".work");
       // Parcours tous les travaux 
       works.forEach(work => {
           // Si le travail correspond à la catégorie sélectionnée
           work.style.display = work.dataset.category === buttonFilterIdValue ? "block" : "none";
       }); 
         
};