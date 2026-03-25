import { useState, useEffect } from "react";
import style from "./styles/App.module.css";

const App = () => {
  const [gameName, setGameName] = useState("");

  const [games, setGames] = useState(() => {
    const storedGames = localStorage.getItem("games");

    if (!storedGames) return [];

    return JSON.parse(storedGames);
  });

  const [editingGameId, setEditingGameId] = useState(null);

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  const handleSubmitGame = () => {
    if (gameName.trim() === "") return;

    const isEditing = editingGameId !== null;
    if (isEditing) {
      // modo edição
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === editingGameId ? { ...game, name: gameName } : game,
        ),
      );

      setEditingGameId(null);
    } else {
      // modo criação
      const newGame = {
        id: Date.now(),
        name: gameName,
      };

      setGames((prevGames) => [...prevGames, newGame]);
    }

    setGameName("");
  };

  const handleRemoveGame = (id) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
  };

  const handleEditGame = (game) => {
    setGameName(game.name);
    setEditingGameId(game.id);
  };

  return (
    <>
      <main className={style.appContainer}>
        <h1>Safe Room Records</h1>

        <div className={style.insertDataContainer}>
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <button onClick={handleSubmitGame}>
            {editingGameId !== null ? "Salvar" : "Adicionar"}
          </button>
        </div>

        <div className={style.listContainer}>
          {games.map((game) => (
            <div key={game.id}>
              <span>{game.name}</span>
              <button onClick={() => handleRemoveGame(game.id)}>Remover</button>
              <button onClick={() => handleEditGame(game)}>Editar</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export { App };
