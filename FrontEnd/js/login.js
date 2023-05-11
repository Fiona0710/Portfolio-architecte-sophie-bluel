
const form = document.getElementById('form');

const url = 'http://localhost:5678/api/users/login';

//évenement au moment de soumettre le formulaire 
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  //try et catch servent a afficher les erreurs potentielles dans la console.
  try {
    console.log(email);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value ,
        password: password.value})
    });

    const responseData = await response.json();

    console.log(responseData);

   if (response.ok) {
      const token = responseData.token;
      window.localStorage.setItem("token", token);
      // window.location.href = './index.html';
      console.log(token);
      console.log("Vous êtes connecté :-)");
    } else {
      console.log("L'email ou le mot de passe n'est pas valide");
    } 
  } catch (error) {
    console.error(error);
  }
});



