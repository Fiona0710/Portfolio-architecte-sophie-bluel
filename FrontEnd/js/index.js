// Récupération des données de l'API "works"
  fetchWorks()
  .then(dataWork => {

    // Affichage des filtres
    displayFilters(dataWork);
    
    
    // Affichage des projets dans la galerie
    displayGallery(dataWork); 
        
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






  

  

  


         

          
