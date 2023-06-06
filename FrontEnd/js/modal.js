

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
    modal.classList.toggle("active");
    const modalElement = document.querySelector(".modal-wrapper");
    modalElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

//Afficher la galerie de la modale 
fetchWorksDisplayGallery("#modal-gallery");

//Au click sur le bouton ajouter une afficer la deuxieme page 
const buttonAddPhoto = document.querySelector('.modal-btn'); 
buttonAddPhoto.addEventListener('click', modalePageSecond);


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


// fonction pour afficher la premiere page ou non
function FirstPageModalDisplay(displayValue){
  const modalPageOne = document.getElementById('modal-page-one');
  setDisplayStyle(modalPageOne, displayValue);
};

// fonction pour afficher la deuxieme page ou non 
function secondPageModalDisplay(displayValue){
  const modalPageTwo = document.getElementById('modal-page-two');
  setDisplayStyle(modalPageTwo, displayValue);
  if(displayValue !== "none"){
    createPrevButton();
  }
};  

function modalePageSecond () {
  FirstPageModalDisplay('none');
  secondPageModalDisplay('flex');
};

function modalePagefirst () {
  FirstPageModalDisplay('flex');
  secondPageModalDisplay('none');
};

/**************** Supprimer un projet ****************/

// fonction pour supprimmer un projet
function deleteWork(workId) {
  // Récupérer le token depuis le local storage
  const token = window.localStorage.getItem('token');

    // Effectuer une requête DELETE à l'API en incluant le token dans l'en-tête
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          // Rafraîchir l'affichage de la galerie après la suppression
          refreshGallery("#modal-gallery");
          refreshGallery(".gallery");
        } else if(response.status === 401) {
          // Gérer les erreurs de suppression
          displayErrorMessage("Utilisateur non autorisé!!! Vous allez etre redirigé vers la page connexion.", "#modal-title");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 4000);
        }
      })
      .catch(error => {
        displayErrorMessage("Une erreur s'est produite lors de la suppression de l'élément.", "#modal-title",error);
      });  
}

// fonction pour afficher un bouton supprimer et une suppression au click sur celui ci
function displayDeleteButton(figure, workId){
  const deleteButton = createButtonElement(['modal-delete-button']);
  const deleteIcon = createIconElement("fa-solid","fa-trash-can");
  deleteButton.style.cursor = 'pointer';
  deleteButton.appendChild(deleteIcon);
  figure.appendChild(deleteButton);

  deleteButton.addEventListener('click', () => {
    const confirmDeleteButton = createButtonElement(['confirm-delete'],"Confirmer suppression");

    confirmDeleteButton.addEventListener("click", function() {
      deleteWork(workId); 
      figure.removeChild(confirmDeleteButton);  
    });
    
    figure.appendChild(confirmDeleteButton);
  });

  return deleteButton
}
// fonction pour afficher le bouton déplacer 
function displayMoveButton(figure){
  const moveButton = createButtonElement(['modal-move-button']);
  moveButton.style.cursor = 'pointer';
  const moveIcon = createIconElement("fa-solid","fa-up-down-left-right");
  moveButton.appendChild(moveIcon);
  figure.appendChild(moveButton);
  return moveButton
}

//fonction pour ajouter faire apparaitre le bouton deplacer au survol d'un projet
function displayMoveButtonHover(figure) {
  const moveButton = displayMoveButton(figure);

  setDisplayStyle(moveButton, 'none');

  figure.addEventListener('mouseenter', () => {
    setDisplayStyle(moveButton, 'flex');
  });

  figure.addEventListener('mouseleave', () => {
    setDisplayStyle(moveButton, 'none');
  });
}
/*************** Formulaire ***************/

function fetchCategories(dataWork) {
  const categorySelect = document.getElementById('categorie');
  categorySelect.innerHTML = ''; // Effacer les options précédentes

  // Création de l'option "Choisissez une catégorie"
  const chooseOption = createAndAppendElement('option', categorySelect, null, {value: '', disabled: true, selected: true});
  chooseOption.textContent = 'Choisissez une catégorie';

  // Création des options de catégorie
  const categoryList = Array.from(new Set(dataWork.map(jsonWork => jsonWork.categoryId)));

  categoryList.forEach(categoryId => {
    const categoryName = dataWork.find(work => work.categoryId === categoryId).category.name;
    const option = createAndAppendElement('option', categorySelect, null, {value: categoryId});
    option.textContent = categoryName;
  });
}

// Sélection de l'élément <form>
const form = document.getElementById('modal-form');

// Création du div "modal-add-photo"
const addPhotoDiv = createAndAppendElement('div', form, 'modal-add-photo');
// Recupération du svg 
const svg = document.querySelector("#modal-form svg");
addPhotoDiv.appendChild(svg);
// Création d'une balise img "container-img"
const containerImg = createAndAppendElement('img', addPhotoDiv, 'container-img',{ id:'container-image'});
containerImg.style.display = 'none';

// Création de l'élément input de type file
const photoInput = createAndAppendInputElement(addPhotoDiv, 'file', 'photo', {
  accept: 'image/jpeg, image/png','max-size': '4194304',style: 'display: none'  
});

// Création du label "Ajouter photo"
const addButton = createAndAppendElement('div', addPhotoDiv, 'modal-btn');
addButton.textContent = '+ Ajouter photo';

// Création de l'élément <p> pour les informations
const infoParagraph = createAndAppendElement('p', addPhotoDiv);
infoParagraph.textContent = 'jpg, png : 4 mo max';

// Création des autres éléments du formulaire
const formFieldDiv = createAndAppendElement('div', form, 'modal-form-field');
const titleInputLabel = createAndAppendElement('label', formFieldDiv, null, { for: 'title' });
titleInputLabel.textContent = 'Titre';

const titleInput = createAndAppendInputElement(formFieldDiv, 'text', 'title',{id: 'title'});

const categoryLabel = createAndAppendElement('label', formFieldDiv, null, { for: 'categorie' });
categoryLabel.textContent = 'Catégorie';

const categorySelect = createAndAppendElement('select', formFieldDiv, null, { name: 'categorie', id: 'categorie' });

const submitInput = createAndAppendInputElement(form, 'submit', null, { value: 'Valider', id: 'modal-btn-submit' });

fetchWorks()
  .then(dataWork => {

fetchCategories(dataWork);
  });

// Événement de clic sur le bouton d'ajout de photo
addButton.addEventListener('click', function() {
  photoInput.click(); // Déclencher la boîte de dialogue de sélection de fichier
});
containerImg.addEventListener('click', function() {
  photoInput.click(); // Déclencher la boîte de dialogue de sélection de fichier
});

photoInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];
 
  if (selectedFile) {
    const reader = new FileReader();

    reader.addEventListener('load', function() {
      const imageUrl = reader.result;
      console.log(imageUrl)

      containerImg.style.display = 'block';
      containerImg.src = imageUrl;
      addButton.style.visibility = 'hidden';

      // Récupérer le nom de fichier (titre de l'image)
      const fileName = selectedFile.name;

      // Formater le nom de fichier
      const formattedFileName = formatFileName(fileName);

      // Pré-remplir le champ "titre" avec le nom de fichier formaté
      titleInput.value = formattedFileName;
    });

    reader.readAsDataURL(selectedFile);
  } else {
    // Réinitialiser l'image si aucun fichier sélectionné
    containerImg.style.display = 'none';
    containerImg.src = '';
    addButton.style.visibility = 'visible';
    // Réinitialiser le champ "titre"
    titleInput.value = '';
  }
});


function formatFileName(fileName) {
  // Extraire le nom sans l'extension
  const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));

  // Supprimer les chiffres à la fin du nom de fichier
  const formattedFileName = fileNameWithoutExtension.replace(/\d+$/, '');

  // Supprimer les tirets en début et fin de nom
  const trimmedFileName = formattedFileName.replace(/^-+|-+$/g, '');

  // Remplacer les tirets restants par des espaces
  const finalFileName = trimmedFileName.replace(/-/g, ' ');

  return finalFileName;
}
// ...

// Sélection du bouton de validation
const submitButton = document.getElementById('modal-btn-submit');

// Fonction pour vérifier si tous les champs sont remplis
function checkFormFields() {
  const titleValue = titleInput.value;
  const categoryValue = categorySelect.value;
  const imageFile = photoInput.files[0];

  // Vérifier si tous les champs sont remplis
  const allFieldsFilled = titleValue.trim() !== '' && categoryValue.trim() !== '' && imageFile !== undefined;

  // Mettre à jour la couleur du bouton de validation
  submitButton.style.backgroundColor = allFieldsFilled ? '#1D6154' : '#A7A7A7';
}

// Ajouter des écouteurs d'événements pour chaque champ du formulaire
titleInput.addEventListener('input', checkFormFields);
categorySelect.addEventListener('change', checkFormFields);
photoInput.addEventListener('change', checkFormFields);



form.addEventListener('submit', function(event) {
  event.preventDefault();

  const token = window.localStorage.getItem('token');
  // Récupérer les valeurs des champs du formulaire
  const title = titleInput.value;
  const categoryId = categorySelect.value;
  const imageFile = photoInput.files[0]; // Récupérer le fichier image
 
  // Créer un nouvel objet FormData
  const formData = new FormData();
 
  formData.append('title', title);
  formData.append('image', imageFile); // Ajouter directement le fichier image
  formData.append('category', categoryId);
  

 

  // Envoyer les données à votre API
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'multipart/form-data',
    },
    body: formData,
  })
    .then(response => {
      if (response.status === 201) {
        console.log('Ajout réussi');
        // Rafraîchir l'affichage de la galerie après l'ajout
        refreshGallery("#modal-gallery");
        refreshGallery(".gallery");
        modalePagefirst ();
        form.reset();
        containerImg.style.display = 'none';
        containerImg.src = '';
        addButton.style.visibility = 'visible';
        submitButton.style.backgroundColor ='#A7A7A7';
      } else if (response.status === 400) {
        displayErrorMessage("Requête incorrecte!!! Veuillez remplir tous les champs du formulaire.", "#modal-form");

      } else if(response.status === 401) {
        displayErrorMessage("Utilisateur non autorisé!!! Vous allez etre redirigé vers la page connexion.", "#modal-form");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 4000);
      }
    })
    .catch(error => {
      displayErrorMessage("Une erreur est survenue.", "#modal-form" ,error);
    });
});







  
  