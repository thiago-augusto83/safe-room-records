import { useEffect, useState } from "react";
import style from "./styles/App.module.css";

const App = () => {
  const [gameName, setGameName] = useState("");

  const [games, setGames] = useState(() => {
    const storedGames = localStorage.getItem("games");
    if (!storedGames) return [];
    return JSON.parse(storedGames);
  });

  const [editingGameId, setEditingGameId] = useState(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  const showFeedback = (message, type = "error") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
  };

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
      showFeedback("Jogo atualizado com sucesso.", "success");
    } else {
      const newGame = { id: Date.now(), name: gameName };
      setGames((prevGames) => [...prevGames, newGame]);
      showFeedback("Jogo adicionado com sucesso.", "success");
    }

    setGameName("");
  };

  const handleRemoveGame = (id) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
    showFeedback("Jogo removido.", "info");
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
        {/* Feedback message */}
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
