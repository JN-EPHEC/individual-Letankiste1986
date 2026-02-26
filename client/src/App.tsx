import { useEffect, useState } from "react";


interface User {
  id: number;
  name: string;
}

function App() {
  // 1. Définition de l'état
  const [data, setData] = useState<User[]>([]);

  // 2. Appel API au montage du composant
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  // 3. Rendu (JSX)
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.prenom} {item.nom}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
