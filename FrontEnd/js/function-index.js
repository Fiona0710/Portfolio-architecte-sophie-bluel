// Fonction pour recupérer les projets en faisant un appel a l'api 
function fetchWorks() {
    return fetch("http://localhost:5678/api/works")
      .then(data => data.json());
  }

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
          const trashButton = createButtonElement()

    
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

/************************* Fonctions pour rajouter des élèments coté admin ***********************/

// fonction pour creer le bouton et l'icon "modifier"
function createEditElement() {
    const displayEdit = createButtonElement(['positionEdit'],"modifier");
   
    const iconElement = createIconElement("fa-regular", "fa-pen-to-square");
    
    displayEdit.insertBefore(iconElement, displayEdit.firstChild);
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

/**************************** Fonction pour la modale *********************************/

//fonction pour creer le bouton de fermeture de la modale
function createCloseButton(){
  const buttonClose = createButtonElement(["modal-close", "modal-trigger"]); 

  const iconClose = createIconElement("fa-solid", "fa-xmark");
      
  document.querySelector(".modal-wrapper").appendChild(buttonClose); 
  buttonClose.appendChild(iconClose);
  return buttonClose
};

//fonction pour creer le bouton precedent de la modale
function createPrevButton(){
  const buttonPrev = createButtonElement(['modal-prev']);

  const iconPrev = createIconElement("fa-solid","fa-arrow-left-long");
  buttonPrev.appendChild(iconPrev);

  document.getElementById("modal-page-two").appendChild(buttonPrev);  
  
  buttonPrev.addEventListener('click', modalePagefirst);
  return buttonPrev;
}; 
// fonction pour modifier la valeur de display 
function setDisplayStyle(element, displayValue) {
    element.style.display = displayValue;
}

// fonction pour afficher la premiere page ou non
function FirstPageModalDisplay(displayValue){
  const modalPageOne = document.getElementById('modal-page-one');
  setDisplayStyle(modalPageOne, displayValue);
};

// fonction pour afficher la deuxieme page ou non 
function secondPageModalDisplay(displayValue){
  const modalPageTwo = document.getElementById('modal-page-two');
  setDisplayStyle(modalPageTwo, displayValue);
  createPrevButton();
};  

function modalePageSecond () {
  FirstPageModalDisplay('none');
  secondPageModalDisplay('flex');
};

function modalePagefirst () {
  FirstPageModalDisplay('flex');
  secondPageModalDisplay('none');
};
  
  
  
 
 
     
  
  