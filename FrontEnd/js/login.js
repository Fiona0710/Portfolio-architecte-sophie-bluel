const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');


form.addEventListener('submit',(event)=>{
  event.preventDefault(); //Empeche l'envoie du formulaire 
    
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email:"sophie.bluel@test.tld", password: "S0phie" }) 
    });
});