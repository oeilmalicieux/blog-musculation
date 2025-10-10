const auth = firebase.auth();

// Créer un compte
document.getElementById('signup-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  auth.createUserWithEmailAndPassword(email,password)
      .then(()=>alert("Compte créé !"))
      .catch(err=>alert(err.message));
});

// Connexion
document.getElementById('login-form')?.addEventListener('submit', e=>{
  e.preventDefault();
  const email=document.getElementById('login-email').value;
  const password=document.getElementById('login-password').value;
  auth.signInWithEmailAndPassword(email,password)
      .then(()=>alert("Connecté !"))
      .catch(err=>alert(err.message));
});

// Affichage espace membre
auth.onAuthStateChanged(user=>{
  const section=document.getElementById('private-section');
  if(section) section.style.display = user ? 'block':'none';
});
