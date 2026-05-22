// 6 - Importação do CSS
import { use, useEffect, useState } from "react";
import style from "./styles/App.module.css";

// 1 - Criação do componente App
const App = () => {
  // 10 - Estado gameName
  const [gameName, setGameName] = useState("");
  const [games, setGames] = useState([]);
  const [editingGameId, setEditingGameId] = useState(null);

  // 11 - handleSubmitGame
  const handleSubmitGame = () => {
    console.log("handleSubmitGame foi chamado.");

    // - 12 Testa de game name está fazio
    if (gameName.trim() === "") {
      console.log("Input gameName está vazio.");
      return;
    }

    console.log("Digitando o nome: ", gameName);

    const isEditing = editingGameId !== null;

    console.log("Está editando? ", isEditing);

    if (isEditing) {
      console.log("Modo edição.");

      setGames((prevGames) => {
        console.log("Estado anterior: ", prevGames);

        const updated = prevGames.map((game) => {
          if (game.id === editingGameId) {
            console.log("Atualizando o jogo: ", game);
            return { ...game, name: gameName };
          }
          return game;
        });
        console.log("Novo estado: ", updated);
        return updated;
      });
      setEditingGameId(null);
      console.log("Saindo do modo edição");
    } else {
      console.log("Modo criação");
      const newGame = {
        id: Date.now(),
        name: gameName,
      };

      console.log("Novo jogo: ", newGame);

      setGames((prevGames) => {
        console.log("Estado anterior: ", prevGames);

        const updated = [...prevGames, newGame];

        console.log("Novo Estado: ", updated);

        return updated;
      });
    }

    // 13 - Cria o objeto newGame que vai receber as propriedades ID e NAME.
    // const newGame = {
    //   id: Date.now(),
    //   name: gameName,
    // };

    // 14 - Muda o estado de games
    // prevGames -> Array completo com todos os jogos cadastrados
    // setGames((prevGames) => [...prevGames, newGame]);
    console.log("Limpando o input.");
    setGameName("");
  };

  // 18 - Função que remove o jogo
  const handleRemoveGame = (id) => {
    //
    setGames((prevGames) => {
      console.log("Estado anterior: ", prevGames);
      const filtered = prevGames.filter((game) => game.id !== id);
      console.log("Novo estado: ", filtered);
      return filtered;
    });
  };

  // 20
  const handleEditGame = (game) => {
    console.log("Editando o jogo: ", game);
    setGameName(game.name);
    setEditingGameId(game.id);
  };

  // 15 - Monitora as ações
  useEffect(() => {
    console.log("Nome do jogo: ", gameName);
    console.log("Biblioteca de jogos: ", games);
    console.table(games);
  }, [gameName, games]);

  // 2 - Retorno do componente App
  return (
    <>
      {/* 3 - Container <main> pricipal do componente App */}
      <main className={style.appContainer}>
        {/* 5 - Título */}
        <h1>Safe Room Records</h1>

        {/* 7 - Container para inserir os dados */}
        <div className={style.insertDataContainer}>
          {/* 8 - Input text */}
          {/* 13 - Adicionando value e onChange ao input text */}
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          {/* 9 - Botão adicionar */}
          {/* 12 - onClick com handleSubmitGame */}
          <button onClick={handleSubmitGame}>Adicionar</button>
        </div>
        {/* 16 - Container para listas os dados */}
        <div className={style.listContainer}>
          {/* 17 */}
          {games.map((game) => {
            console.log("Renderizando o jogo: ", game);
            return (
              <div key={game.id}>
                {game.name}
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

// 4 - Exportação do componente App
export { App };
