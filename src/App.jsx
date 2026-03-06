import { use, useState } from "react";
import style from "./styles/App.module.css";

const App = () => {
  const [gameName, setGameName] = useState("");
  const [games, setGames] = useState([]);

  const handleAddGame = () => {
    if (gameName.trim() === "") return;

    const newGame = {
      id: Date.now(),
      name: gameName,
    };

    setGames([...games, newGame]);
    setGameName("");
  };

  const handleRemoveGame = (id) => {
    setGames(games.filter((game) => game.id !== id));
  };

  return (
    <>
      <main className={style.appContainer}>
        <h1>Safe Room Records</h1>

        <div className={style.insertDataContainer}>
          <input
            type="text"
            placeholder="Digite o nome do jogo"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />

          <button className={style.btnInsert} onClick={handleAddGame}>
            Adicionar
          </button>
        </div>

        <div className={style.listContainer}>
          {games.map((game) => (
            <div key={game.id}>
              <span>{game.name}</span>
              <button onClick={() => handleRemoveGame(game.id)}>Remover</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export { App };
