import style from "./styles/App.module.css";
import { GameList } from "./components/GameList";
import { useEffect, useState } from "react";

const App = () => {
  const [gameName, setGameName] = useState("");

  const [games, setGames] = useState(() => {
    const storedGames = localStorage.getItem("games");
    if (!storedGames) return [];

    return JSON.parse(storedGames);
  });

  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const [editingGameId, setEditingGameId] = useState(null);

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  const handleSubmitGame = () => {
    if (gameName.trim() === "") {
      showFeedback("O input está vazio! Digite o nome do jogo.", "error");
      return;
    }

    const isEditing = editingGameId !== null;

    if (isEditing) {
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === editingGameId ? { ...game, name: gameName } : game,
        ),
      );
      setEditingGameId(null);
      showFeedback("Jogo editado com sucesso.", "success");
    } else {
      const newGame = { id: Date.now(), name: gameName };
      setGames((prevGames) => [...prevGames, newGame]);
      showFeedback("Jogo adicionado com sucesso", "success");
    }

    setGameName("");
  };

  const showFeedback = (message, type = "error") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
  };

  const handleRemoveGame = (gameId) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
    showFeedback("Jogo removido com sucesso.", "info");
  };

  const handleEditGame = (game) => {
    setGameName(game.name);
    setEditingGameId(game.id);
  };

  const handleCancelEdit = () => {
    setEditingGameId(null);
    setGameName("");
    showFeedback("Edição cancelada.", "info");
  };

  return (
    <>
      <h1>Safe Room Records</h1>

      <main className={style.appContainer}>
        <div
          className={`${style.feedback} ${feedback.message ? style.feedbackVisible : ""} ${style[`feedback_${feedback.type}`]}`}
        >
          {feedback.message}
        </div>

        <div className={style.insertDataContainer}>
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitGame()}
          />

          <button onClick={handleSubmitGame}>
            {editingGameId !== null ? "Salvar" : "Adicionar"}
          </button>

          {editingGameId !== null && (
            <button className={style.btnCancel} onClick={handleCancelEdit}>
              Cancelar
            </button>
          )}
        </div>

        <div className={style.listContainer}>
          {games.map((game) => {
            return (
              <GameList
                games={games}
                onRemove={handleRemoveGame}
                onEdit={handleEditGame}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export { App };
