import { useState } from "react";
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

  // 1 - Criar a função handleRemoveGame
  const handleRemoveGame = (id) => {
    // 3 - Atualizar o estado games usando filter
    setGames(games.filter((game) => game.id !== id));
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
          <button className={style.btnInsert} onClick={handleAddGame}>
            Adicionar
          </button>
        </div>

        <div className={style.listContainer}>
          {games.map((game) => (
            <div key={game.id}>
              <span>{game.name}</span>
              {/* 4 - Adicionar botão "Remover" ao lado de cada jogo */}
              <button onClick={() => handleRemoveGame(game.id)}>Remover</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export { App };