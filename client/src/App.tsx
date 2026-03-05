import { useEffect, useState } from "react";
import "./App.css";

interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [loading, setLoading] = useState(false);

  // Récupérer la liste au chargement
  const fetchUsers = () => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ajouter un étudiant (POST /api/users)
  const handleAdd = async () => {
    if (!prenom.trim() || !nom.trim()) return;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom: prenom.trim(), nom: nom.trim() }),
      });

      if (!response.ok) {
        console.error("Erreur API:", await response.text());
        return;
      }

      const newUser: User = await response.json();
      // Ajout optimiste coté client
      setData((prev) => [...prev, newUser]);
      setPrenom("");
      setNom("");
    } catch (err) {
      console.error("Erreur lors de l'ajout:", err);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un étudiant (DELETE /api/users/:id)
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/users/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok && response.status !== 204) {
        console.error("Erreur API:", await response.text());
        return;
      }

      // Mise à jour locale
      setData((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Liste des étudiants</h1>

      <div className="card">
        <div className="form-row">
          <div className="field">
            <label>Prénom</label>
            <input
              type="text"
              placeholder="Entrez le prénom de l'étudiant"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Nom</label>
            <input
              type="text"
              placeholder="Entrez le nom de l'étudiant"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
        </div>

        <button
          className="add-btn"
          onClick={handleAdd}
          disabled={loading || !prenom.trim() || !nom.trim()}
        >
          Ajouter l'étudiant
        </button>

        <ul className="student-list">
          {data.map((item) => (
            <li key={item.id} className="student-item">
              <div>
                <div className="student-name">
                  {item.prenom} {item.nom}
                </div>
                <div className="student-date">
                  {new Date().toLocaleDateString("fr-FR")}
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
                disabled={loading}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
