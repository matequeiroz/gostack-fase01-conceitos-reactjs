import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(...repositories, response.data);
    });
  }, []);

  async function handleAddRepository() {
    const result = await api.post("/repositories", {
      title: `Novo Respositório ${Date.now()}`,
      url: "http://github.com/matequeiroz",
      techs: ["ReactJS"],
    });

    setRepositories([...repositories, result.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newData = repositories.filter((item) => item.id !== id);

    setRepositories([...newData]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item) => {
          return (
            <li key={item.id}>
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
