document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');
  let userList = document.getElementById('user-list');
  let users = [];

  async function chargerUsers() {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      users = await response.json();
      afficherListe();
    } catch (error) {
      console.error('Erreur chargement:', error);
    }
  }

  chargerUsers();

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    if (form.checkValidity()) {
      const nom = document.getElementById('nom').value.trim();
      const prenom = document.getElementById('prenom').value.trim();
      
      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nom, prenom })
        });
        
        if (response.ok) {
          users.push({ nom, prenom });
          afficherListe();
          form.reset();
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  });

  // Affichage liste
  function afficherListe() {
    let html = '';
    
    for (let i = 0; i < users.length; i++) {
      html += `
        <li class="list-group-item d-flex justify-content-between align-items-center p-3 border-start border-primary border-4 bg-light">
          <div>
            <h6 class="mb-1 fw-bold">${users[i].prenom} ${users[i].nom}</h6>
            <small class="text-muted">${new Date().toLocaleDateString('fr-FR')}</small>
          </div>
          <button class="btn btn-danger btn-sm" onclick="supprimerUtilisateur(${i})">X</button>
        </li>
      `;
    }
    
    userList.innerHTML = html;
  }
});
