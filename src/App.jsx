import { useState } from "react";
import style from "./styles/App.module.css";

const App = () => {
  // 7 -
  const [gameName, setGameName] = useState("");
  // gameName - Valor atual do input
  // setGameName - Função que atualiza esse valor
  // useState começa vazio

  // 11 -
  // games - Lista de jogos
  // setGames - Função que atualiza essa lista
  // Começa com array vazio
  const [games, setGames] = useState([]);

  // 9 - Componente handleAddGame
  // Essa função roda quando o botão é clicado
  const handleAddGame = () => {
    // 10 - if
    // Evita adicionar jogo vazio
    // trim() remove espaços
    // Se o usuário digitar só espaços não deixa adicionar
    if (gameName.trim() === "") return;

    // 12 - newGame
    // Aqui criamos um objeto
    // id: número único baseado no tempo atual
    // name: O que o usuário digitou
    const newGame = {
      id: Date.now(),
      name: gameName,
    };

    // 13 - Essa é a linha mais importante do código
    // ...games - é o spread operator, SIGNIFICA: "Peque todos os itens que já existem dentro do array games"
    setGames([...games, newGame]);
    // Limpa o input após adicionar
    // Como o input é controlado, ele automaticamente apaga na tela.
    setGameName("");
  };

  return (
    <>
      <main className={style.appContainer}>
        {/* 1 - h1*/}
        <h1>Safe Room Records</h1>

        {/* 2 - div - insertDataContainer */}
        <div className={style.insertDataContainer}>
          {/* 3 - input text + placeholder */}
          {/* 8 - value={gameName} */}
          {/* 14 - onChange - Sempre que digita atualiza o estado*/}
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />

          {/* 4 - Button + clasName */}
          {/* 15 - onClick */}
          <button className={style.btnInsert} onClick={handleAddGame}>
            Adicionar
          </button>
        </div>

        {/* 5 - div - listContainer */}
        <div className={style.listContainer}>
          {/* 6 - span */}
          {/* 16 - games.map */}
          {/* Aqui começa o loop, para cada item dentro de games, você retorna um elemento JSX */}
          {/* key é obrigatório quando renderiza a lista, ele ajuda o React a identificar
           qual item mudou, nuca use ÍNDICE como key em CRUD real, você fez certo usando ID. */}
          {games.map((game) => (
            <div key={game.id}>
              <span>{game.name}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export { App };
