// Récupération des éléments HTML 
const filters = document.getElementById("filters");
const gallery = document.querySelector(".gallery");
// Récupération des données de l'API "works"
fetch("http://localhost:5678/api/works")
  .then(data => data.json())
  .then(jsonListWork => {
    // Récupération des données de l'API "categories"
    fetch("http://localhost:5678/api/categories")
      .then(data => data.json())
      .then(jsonListCategories => {
        // Création d'une liste de filtres en triant les catégories des différents travaux récupérées
        const filterList = Array.from(new Set(jsonListWork.map(jsonWork => jsonWork.categoryId)))                       
        // Ajout du filtre "Tous" en tant que premier élément de la liste des filtres
        filters.innerHTML += `<li class="filter" id="0">Tous</li>`;
        /* Parcours de la liste des catégories de filtres, et pour chaque catégorie, 
        récupération de son nom correspondant dans la liste de catégories récupérées,
         puis création de l'élément HTML correspondant pour ce filtre*/
        filterList.forEach(categoryId => {
          const category = jsonListCategories.find(category => category.id === categoryId);
          filters.innerHTML += `<li class="filter" id="${categoryId}">${category.name}</li>`;
        });
        /*Parcours de la liste de travaux récupérés, 
        et pour chaque travail, création de l'élément HTML correspondant en y incluant son image,
         son titre et sa catégorie*/
        jsonListWork.forEach(jsonWork => {
          gallery.innerHTML += `<figure class="work" data-category="${jsonWork.categoryId}">
                                    <img src="${jsonWork.imageUrl}" alt="image du projet">
                                    <figcaption>${jsonWork.title}</figcaption>
                                </figure>`;
        });
        //Gestion de l'affichage des travaux en fonction du filtre sélectionné par l'utilisateur :
        //Récupération de tous les filtres et de la liste de tous les travaux :
        const buttonFilters = document.querySelectorAll(".filter");
        const filterAll = buttonFilters[0];
        const works = document.querySelectorAll(".work");

        //au click sur le filtre "Tous" , tout les projets s'affichent
        filterAll.addEventListener("click",showAllWorks);

        // Supprime la classe "filter_active" de tous les filtres
        function deleteActiveClass(){
            buttonFilters.forEach(filter => filter.classList.remove("filter_active"));
        };
        function showAllWorks(){
            works.forEach(work => work.style.display = "block");
            deleteActiveClass();
            filterAll.classList.add("filter_active");   
        };
        
        /*Parcours de tous les filtres, à l'exception du filtre "Tous",
        et pour chaque filtre, ajout d'un événement */
        buttonFilters.forEach(buttonFilter => {
            if (buttonFilter !== filterAll) {
                const categoryId = buttonFilter.getAttribute("id");
                buttonFilter.addEventListener("click", () => {
                    deleteActiveClass();
                    // Ajoute la classe "filter_active" au filtre actuel
                    buttonFilter.classList.add("filter_active");
                    // Parcours tous les travaux
                    works.forEach(work => {
                    // Si le travail correspond à la catégorie sélectionnée
                        if (work.dataset.category === categoryId) {
                            work.style.display = "block"; // Affiche le travail
                            } else {
                                work.style.display = "none"; // Cache le travail
                            };
                    });
                });
            }
       });
    });
});




  

  

  


         

          
