// GLOBALES (vides au début)
let users = [];
let userList;
let form;
let userEditing = null;

// FONCTIONS GLOBALES
function afficherListe() {
  let html = '';
  for (let i = 0; i < users.length; i++) {
    html += `
      <li class="list-group-item d-flex justify-content-between align-items-center p-3 border-start border-primary border-4 bg-light">
        <div>
          <h6 class="mb-1 fw-bold">${users[i].prenom || ''} ${users[i].nom || ''}</h6>
          <small class="text-muted">ID: ${users[i].id} | ${new Date().toLocaleDateString('fr-FR')}</small>        </div>
        <button class="btn btn-danger btn-sm" onclick="supprimerUtilisateur(${i})">X</button>
      </li>
    `;
  }
  userList.innerHTML = html;  
}

async function supprimerUtilisateur(index) {
  let userId = users[index].id;
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      users.splice(index, 1);
      afficherListe();
    }
  } catch (error) {
    console.error('Erreur suppression:', error);
  }
}

async function chargerUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users');
    users = await response.json();
    afficherListe();
  } catch (error) {
    console.error('Erreur chargement:', error);
  }
}

//Recherche par ID
async function rechercherId() {
  let idInput = document.getElementById('recherche-id');
  let id = parseInt(idInput.value);
  
  if (!id) {
    document.getElementById('resultat-recherche').style.display = 'none';
    return;
  }
  
  try {
    let response = await fetch(`http://localhost:3000/api/users/${id}`);
    let resultatDiv = document.getElementById('resultat-recherche');
    
    if (response.ok) {
      let user = await response.json();
      resultatDiv.innerHTML = `
        <strong>Trouvé :</strong> ${user.prenom || ''} ${user.nom || ''}<br>
        <button onclick="modifierUtilisateurParId(${user.id})" class="btn btn-sm btn-warning mt-2">Modifier</button>
      `;
    } else {
      resultatDiv.innerHTML = '<strong>ID non trouvé</strong>';
    }
    resultatDiv.style.display = 'block';
  } catch (error) {
    console.error('Erreur recherche:', error);
  }
}

//Prépare modification
function modifierUtilisateur(index) {
  userEditing = users[index];
  document.getElementById('prenom').value = userEditing.prenom || '';
  document.getElementById('nom').value = userEditing.nom || '';
  document.querySelector('button[type="submit"]').textContent = 'Modifier'; 
  document.querySelector('button[type="submit"]').className = 'btn btn-warning btn-lg mt-3 w-100';
}

//Modifier via recherche ID
function modifierUtilisateurParId(id) {
  let index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    modifierUtilisateur(index);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  form = document.querySelector('form');
  userList = document.getElementById('user-list');

  chargerUsers();
  
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    if (form.checkValidity()) {
      let nom = document.getElementById('nom').value.trim();
      let prenom = document.getElementById('prenom').value.trim();
      
      try {
        let response;
        
        if (userEditing) {
          // fonctionnalité modifier (PUT)
          response = await fetch(`http://localhost:3000/api/users/${userEditing.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom })
          });
          

          let index = users.findIndex(u => u.id === userEditing.id);
          if (index !== -1) {
            users[index] = { ...users[index], nom, prenom };
          }
          userEditing = null;
          
        } else {
          // fonctionnalité d'ajout (POST)
          response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom })
          });
          
          // Recharge la liste complète
          if (response.ok) {
            chargerUsers(); 
            return; 
          }
        }
        
        if (response.ok) {
          form.reset();
          document.querySelector('button[type="submit"]').textContent = "➕ Ajouter l'étudiant";
          document.querySelector('button[type="submit"]').className = 'btn btn-primary btn-lg mt-3 w-100';
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  });
});

