// 5
import { useEffect, useState } from "react";
import style from "./styles/App.module.css";

// 1
const App = () => {
  // 1.2
  console.log("🔄 Renderizando o App");

  // 12
  const [gameName, setGameName] = useState("");
  // 12.1
  // const [games, setGames] = useState([]);
  // 56
  const [games, setGames] = useState(() => {
    // 57
    console.log("📦 Inicializando games (useState)");

    // 58
    const storedGames = localStorage.getItem("games");
    // 59
    console.log("📦 localStorage:", storedGames);

    // 60
    if (!storedGames) {
      // 61
      console.log("📦 Nenhum jogo salvo, iniciando vazio");
      // 62
      return [];
    }

    // 63
    const parsed = JSON.parse(storedGames);
    // 64
    console.log("📦 Jogos carregados:", parsed);
    // 65
    return parsed;
  });

  // 29
  const [editingGameId, setEditingGameId] = useState(null);

  // 🔵 Sempre que games muda
  useEffect(() => {
    // 66
    console.log("💾 Salvando no localStorage:", games);
    // 67
    localStorage.setItem("games", JSON.stringify(games));
    // 68
  }, [games]);

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

    // 32
    const isEditing = editingGameId !== null;
    // 33
    console.log("✏️ Está editando?", isEditing);

    // 34
    if (isEditing) {
      // 35
      console.log("🛠️ MODO EDIÇÃO");

      // 36
      setGames((prevGames) => {
        // 37
        console.log("📌 Estado anterior:", prevGames);
        // 38
        const updated = prevGames.map((game) => {
          // 39
          if (game.id === editingGameId) {
            // 40
            console.log("✅ Atualizando jogo:", game);
            // 41
            return { ...game, name: gameName };
          }
          // 42
          return game;
        });
        // 43
        console.log("📌 Novo estado:", updated);
        // 44
        return updated;
      });
      // 45
      setEditingGameId(null);
      // 46
      console.log("🔄 Saindo do modo edição");
      // 47
    } else {
      // 48
      console.log("🆕 MODO CRIAÇÃO");

      // 49
      const newGame = {
        id: Date.now(),
        name: gameName,
      };

      // 50
      console.log("➕ Novo jogo:", newGame);

      // 51
      setGames((prevGames) => {
        // 52
        console.log("📌 Estado anterior:", prevGames);
        // 53
        const updated = [...prevGames, newGame];
        // 54
        console.log("📌 Novo estado:", updated);
        // 55
        return updated;
      });
    }

    // 17
    // const newGame = {
    //   id: Date.now(),
    //   name: gameName,
    // };

    // 18
    // setGames((prevGames) => [...prevGames, newGame]);
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
    console.log("➡ editingGame:", editingGameId);
    console.log("➡ games:", games);
    console.table(games);
  }, [games, gameName, editingGameId]);

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
          <button onClick={handleSubmitGame}>
            {/* 56 */}
            {editingGameId !== null ? "Salvar" : "Adicionar"}
          </button>
        </div>
        {/* 22 */}
        {/* 22.1 - className */}
        <div className={style.listContainer}>
          {/* 23 */}
          {games.map((game) => {
            console.log("🎮 Renderizando jogo:", game);

            return (
              // 24 div -> key
              <div key={game.id}>
                {/* 25 */}
                {game.name}
                {/* 28 */}
                <button onClick={() => handleRemoveGame(game.id)}>
                  Remover
                </button>
                {/* 31 */}
                <button onClick={() => handleEditGame(game)}>Editar</button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

// 4
export { App };
