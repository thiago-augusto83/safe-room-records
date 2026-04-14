// 5
import { useEffect, useState } from "react";
import style from "./styles/App.module.css";

// 1
const App = () => {
  // 1.2
  console.log("🔄 Renderizando o App");

  // 12
  const [gameName, setGameName] = useState("");
  const [games, setGames] = useState([]);

  // 29
  const [editingGameId, setEditingGameId] = useState(null);

  // 13
  const handleSubmitGame = () => {
    // 13.1
    console.log("🟢 handleSubmitGame chamado");

    // 14
    if (gameName.trim() === "") {
      console.log("⚠️ Vazio!");
      return;
    }

    // 16
    // 16.1
    console.log("✍️ Nome digitado: ", gameName);

    // 17
    const newGame = {
      id: Date.now(),
      name: gameName,
    };

    // 18
    setGames((prevGames) => [...prevGames, newGame]);
    // 19
    setGameName("");
    // 19.1
    console.log("🧹 Limpando input");
  };

  // 26
  const handleRemoveGame = (id) => {
    console.log("🗑️ Removendo o jogo ID: ", id);
    // 27
    // setGames((prevGames) => prevGames.filter((game) => game.id !== id));
    // 28
    setGames((prevGames) => {
      // 28.1
      console.log("Estado anterior: ", prevGames);

      // 28.2
      const filtered = prevGames.filter((game) => game.id !== id);

      // 28.3
      console.log("📌 Novo estado: ", filtered);
      return filtered;
    });
  };

  // 30
  const handleEditGame = (game) => {
    console.log("✏️ Editando o jogo: ", game);
    setGameName(game.name);
    setEditingGameId(game.id);
  };

  // 20 - 🟡 Monitorando mudanças
  useEffect(() => {
    console.log("📊 Estado atualizado:");
    console.log("➡ gameName:", gameName);
    console.log("➡ games:", games);
    console.table(games);
  }, [gameName, games]);

  // 2
  return (
    <>
      {/* 3 */}
      {/* 6 - className */}
      <main className={style.appContainer}>
        {/* 7 */}
        <h1>Safe Room Records</h1>
        {/* 8 - */}
        {/* 9 - className */}
        <div className={style.insertDataContainer}>
          {/* 10 */}
          {/* 16 - value, onChange */}
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          {/* 11 */}
          {/* 15 - onClick */}
          <button onClick={handleSubmitGame}>Adicionar</button>
        </div>
        {/* 22 */}
        {/* 22.1 - className */}
        <div className={style.listContainer}>
          {/* 23 */}
          {games.map((game) => (
            // 24 div -> key
            <div key={game.id}>
              {/* 25 */}
              {game.name}
              {/* 28 */}
              <button onClick={() => handleRemoveGame(game.id)}>Remover</button>
              {/* 31 */}
              <button onClick={() => handleEditGame(game)}>Editar</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

// 4
export { App };
