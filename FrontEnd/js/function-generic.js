// fonction pour modifier la valeur de display 
function setDisplayStyle(element, displayValue) {
    element.style.display = displayValue;
}

// Fonction pour creer un bouton, lui appliquer une ou plusieurs class , et inserer un texte 
function createButtonElement(classNames = [], textContent = "") {
    const button = document.createElement("div");
    button.setAttribute("role", "button");
  
    if (Array.isArray(classNames)) {
      classNames.forEach(className => {
        button.classList.add(className);
      });
    } else {
      button.classList.add(classNames);
    }
  
    if (textContent) {
      button.textContent = textContent;
    }
  
    return button;
  }
  
// function pour creer un icon 
function createIconElement(...classNames){
    const icon = document.createElement("i");
    classNames.forEach(className => {
        icon.classList.add(className);
    });
    return icon;
}