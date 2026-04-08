import { useEffect, useState } from "react";
import style from "./styles/App.module.css";

const App = () => {
  console.log("🔄 Renderizando App");

  const [gameName, setGameName] = useState("");
  
  const [games, setGames] = useState(() => {
    console.log("📦 Inicializando games (useState)");

    const storedGames = localStorage.getItem("games");
    console.log("📦 localStorage:", storedGames);

    if (!storedGames) {
      console.log("📦 Nenhum jogo salvo, iniciando vazio");
      return [];
    }

    const parsed = JSON.parse(storedGames);
    console.log("📦 Jogos carregados:", parsed);
    return parsed;
  });

  const [editingGame, setEditingGameId] = useState(null);

  // 🔵 Sempre que games muda
  useEffect(() => {
    console.log("💾 Salvando no localStorage:", games);
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  // 🟡 Monitorando mudanças
  useEffect(() => {
    console.log("📊 Estado atualizado:");
    console.log("➡ gameName:", gameName);
    console.log("➡ editingGame:", editingGame);
    console.log("➡ games:", games);
    console.table(games);
  }, [games, gameName, editingGame]);

  const handleSubmitGame = () => {
    console.log("🟢 handleSubmitGame chamado");

    if (gameName.trim() === "") {
      console.log("⚠️ Input vazio!");
      return;
    }

    console.log("✍️ Nome digitado:", gameName);

    const isEditing = editingGame !== null;
    console.log("✏️ Está editando?", isEditing);

    if (isEditing) {
      console.log("🛠️ MODO EDIÇÃO");

      setGames((prevGames) => {
        console.log("📌 Estado anterior:", prevGames);

        const updated = prevGames.map((game) => {
          if (game.id === editingGame) {
            console.log("✅ Atualizando jogo:", game);
            return { ...game, name: gameName };
          }
          return game;
        });

        console.log("📌 Novo estado:", updated);
        return updated;
      });

      setEditingGameId(null);
      console.log("🔄 Saindo do modo edição");
    } else {
      console.log("🆕 MODO CRIAÇÃO");

      const newGame = {
        id: Date.now(),
        name: gameName,
      };

      console.log("➕ Novo jogo:", newGame);

      setGames((prevGames) => {
        console.log("📌 Estado anterior:", prevGames);
        const updated = [...prevGames, newGame];
        console.log("📌 Novo estado:", updated);
        return updated;
      });
    }

    setGameName("");
    console.log("🧹 Limpando input");
  };

  const handleRemoveGame = (id) => {
    console.log("🗑️ Removendo jogo ID:", id);

    setGames((prevGames) => {
      console.log("📌 Estado anterior:", prevGames);

      const filtered = prevGames.filter((game) => game.id !== id);

      console.log("📌 Novo estado:", filtered);
      return filtered;
    });
  };

  const handleEditGame = (game) => {
    console.log("✏️ Editando jogo:", game);

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
            onChange={(e) => {
              console.log("⌨️ Digitando:", e.target.value);
              setGameName(e.target.value);
            }}
          />

          <button onClick={handleSubmitGame}>
            {editingGame !== null ? "Salvar" : "Adicionar"}
          </button>
        </div>

        <div className={style.listContainer}>
          {games.map((game) => {
            console.log("🎮 Renderizando jogo:", game);

            return (
              <div key={game.id}>
                <span>{game.name}</span>

                <button onClick={() => handleRemoveGame(game.id)}>
                  Remover
                </button>

                <button onClick={() => handleEditGame(game)}>Editar</button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export { App };
