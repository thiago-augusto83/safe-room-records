// 2. Importação dos estilos e estados.
import style from "./styles/App.module.css";
import { useEffect, useState } from "react";

// 1. Componente principal da aplicação.
const App = () => {
  // 8. State gameName e games
  const [gameName, setGameName] = useState("");
  const [games, setGames] = useState([]);
  // 19. State de feedback
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  // 23. State editingGameId
  const [editingGameId, setEditingGameId] = useState(null);

  // 9. Função handleSubmitGame
  //    Vai mudar ao longo do projeto.
  const handleSubmitGame = () => {
    // DESCARTAVEL
    // console.log("handleSubmitGame foi chamado.");

    // 10. Validação do input
    if (gameName.trim() === "") {
      showFeedback("O input está vazio! Digite o nome do jogo.", "error");
      return;
    }

    // 25. Verificação de edição
    //     isEditing == true => editar
    //     isEditing == false => adicionar
    const isEditing = editingGameId !== null;

    // 26. Se estiver editando, edita.
    if (isEditing) {
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === editingGameId ? { ...game, name: gameName } : game,
        ),
      );
      setEditingGameId(null);
      showFeedback("Jogo editado com sucesso.", "success");
    }else{
      // PAREI AQUI
    }

    // 11. Objeto que será adicionado ao state como novo jogo.
    //     Vai mudar ao longo do projeto.
    const newGame = {
      id: Date.now(),
      name: gameName,
    };

    // 12. Adição do novo jogo ao state.
    //     Vai mudar ao longo do projeto.
    setGames((prevGames) => [...prevGames, newGame]);
    showFeedback("Jogo adicionado com sucesso.", "success");
    setGameName("");
  };

  // 20. Função showFeedback
  //     Vai mostrar o feedback para o usuário.
  const showFeedback = (message, type = "error") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
  };

  // 22. Função handleRemoveGame
  const handleRemoveGame = (gameId) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
    showFeedback("Jogo removido com sucesso.", "info");
  };

  // 24. Função handleEditGame
  const handleEditGame = (game) => {
    setGameName(game.name);
    setEditingGameId(game.id);
  };

  // DESCARTAVEL
  // Depois de criado a função showFeedback, este useEffect não será mais necessário.
  // useEffect(() => {
  //   console.table(games);
  // }, [games]);

  return (
    <>
      {/* 2. Título da aplicação. */}
      <h1>Safe Room Records</h1>
      {/* 4. Container principal da aplicação. */}
      <main className={style.appContainer}>
        {/* 21. Feedback message */}
        <div
          className={`${style.feedback} ${feedback.message ? style.feedbackVisible : ""} ${style[`feedback_${feedback.type}`]}`}
        >
          {feedback.message}
        </div>
        {/* 5. Container para inserir os dados. */}
        <div className={style.insertDataContainer}>
          {/* 6. Input text para inserir o nome do jogo. */}
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          {/* 7. Botão para adicionar o jogo. */}
          <button onClick={handleSubmitGame}>Adicionar</button>
        </div>

        {/* 13. Listagem dos jogos */}
        <div className={style.listContainer}>
          {/* 14. Itera sobre o state games para renderizar os jogos */}
          {games.map((game) => {
            // 15. Renderiza cada jogo em uma div com a key sendo o id do jogo.
            return (
              <div key={game.id}>
                {/* 16. Exibe o nome do jogo */}
                {game.name}
                {/* 17. Botão para remover o jogo */}
                <button onClick={() => handleRemoveGame(game.id)}>
                  Remover
                </button>
                {/* 18. Botão para editar o jogo */}
                <button onClick={() => handleEditGame(game)}>Editar</button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

// 3. Exportação do componente App
export { App };
