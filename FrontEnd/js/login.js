
const header =document.querySelector("header");
header.classList.add("header-logout"); 
const form = document.getElementById('form');
// Evénement au moment de soumettre le formulaire 
form.addEventListener('submit', submitForm);

// Fonction pour soumettre le formulaire
async function submitForm(event) {
    event.preventDefault();

  // try et catch servent à afficher les erreurs potentielles dans la console.
    try {
    //Requete POST pour envoyer les données sur l'api     
      const url = 'http://localhost:5678/api/users/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      });
  
      const responseData = await response.json();

    // Vérification du code de statut de la réponse du serveur
      if (response.status === 200) {
        const token = responseData.token;
        //Enregistrement du token et redirection vers la page d'acceuil
        window.localStorage.setItem("token", token);
        window.location.href = './index.html';
    //Affichage de differents messages d'erreur en fonction du code recu
      } else if (response.status === 401) {
        displayErrorMessage("L'email ou et le mot de passe n'est pas valide.<br>La connexion n'est pas autorisée !!!", "#error");

      } else if (response.status === 404) {
        displayErrorMessage("L'utilisateur ne se trouve pas dans la base de données.", "#error");
      }
      
    //Affichage d'un message d'erreur si aucune connexion au serveur   
    } catch (error) {
      displayErrorMessage("Une erreur est survenue lors de la connexion.<br>Veuillez réessayer plus tard.", "#error");
    }
};

