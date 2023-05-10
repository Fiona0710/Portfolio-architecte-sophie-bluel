// Récupération des éléments HTML 
const filters = document.getElementById("filters");
const gallery = document.querySelector(".gallery");
// Récupération des données de l'API "works"

fetch("http://localhost:5678/api/works")
  .then(data => data.json())
  .then(jsonListWork => {
    console.log(jsonListWork);
        // Création d'une liste de filtres en triant les catégories des différents travaux récupérées
        const filterList = Array.from(new Set(jsonListWork.map(jsonWork => jsonWork.categoryId )));
        console.log(filterList);                
        // Ajout du filtre "Tous" en tant que premier élément de la liste des filtres
        filters.innerHTML += `<li class="filter" id="0">Tous</li>`;
        /* find() permet de trouver le premier élément dans le tableau jsonListWork
         qui a le meme categoryId que le categoryId en cours.*/
        filterList.forEach(categoryId => {      
            const categoryName = jsonListWork.find(work => work.categoryId === categoryId).category.name;                 
            filters. innerHTML += `<li class="filter" id="${categoryId}">${categoryName}</li>`;
            console.log(categoryId);
            console.log(categoryName);
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
        //Récupération de tous les filtres et de tous les travaux 
        const buttonFilters = document.querySelectorAll(".filter");
        const filterAll = buttonFilters[0];
        const works = document.querySelectorAll(".work");

        //au click sur le filtre "Tous" , tout les projets s'affichent
        filterAll.addEventListener("click",showAllWorks);

        function showAllWorks(){
            works.forEach(work => work.style.display = "block");
            deleteActiveClass();
            filterAll.classList.add("filter_active");   
        };

        // Supprime la classe "filter_active" de tous les filtres
        function deleteActiveClass(){
            buttonFilters.forEach(buttonFilter => buttonFilter.classList.remove("filter_active"));
        };
        
        /*Parcours de tous les filtres, à l'exception du filtre "Tous",
        et pour chaque filtre, ajout d'un événement */
        buttonFilters.forEach(buttonFilter => {
            if (buttonFilter !== filterAll) {
                const buttonFilterIdValue = buttonFilter.getAttribute("id");
                buttonFilter.addEventListener("click", () => {
                    deleteActiveClass();
                    // Ajoute la classe "filter_active" au filtre actuel
                    buttonFilter.classList.add("filter_active");
                    // Parcours tous les travaux
                    works.forEach(work => {
                        // Si le travail correspond à la catégorie sélectionnée
                        work.style.display = work.dataset.category === buttonFilterIdValue ? "block" : "none";
                        console.log(buttonFilterIdValue)
                        console.log(work.style.display);
                    }); 
                      
                });
            }
       });      
});




  

  

  


         

          
