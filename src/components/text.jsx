import { useState } from "react";
import style from "./styles/App.module.css";

const App = () => {
  // 4. "gameName" guarda o que você está digitando no teclado agora. Começa vazio ("").
  const [gameName, setGameName] = useState("");
  // 5. "games" é a nossa lista oficial. Começa como um colchete vazio [],
  // que significa uma lista sem nada.
  const [games, setGames] = useState([]);

  // 6. Criamos a função que roda quando clicamos no botão "Adicionar".
  const handleAddGame = () => {
    // 7. Se você não digitou nada ou só espaços,
    // a função para aqui (não adiciona nada vazio).
    if (gameName.trim() === "") return;

    // 8. Criamos um "objeto" jogo. É como uma ficha técnica do jogo.
    const newGame = {
      // 9. Usamos a hora exata (em milisegundos) como um RG (identidade) único para esse jogo.
      id: Date.now(),
      // 10. O nome dele será o que você digitou na tela.
      name: gameName,
    };

    // 11. Aqui dizemos: "Pega todos os jogos que já existem
    // (...games) e coloca esse novo (newGame) no final".
    setGames([...games, newGame]);
    // 12. Limpa o campo de texto para você poder digitar o próximo jogo.
    setGameName("");
  };

  // 13. Essa função recebe o "RG" (id) do jogo que você quer apagar.
  const handleRemoveGame = (id) => {
    // 14. O filtro é como uma peneira: "Deixe passar todos os jogos,
    // MENOS o que tem o ID que eu quero deletar".
    setGames(games.filter((game) => game.id !== id));
  };

  return (
    <>
      <main className={style.appContainer}>
        <h1>Safe Room Records</h1>
        <div className={style.insertDataContainer}>
          {" "}
          {/* 18. Uma caixa para organizar a entrada de dados. */}
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            value={gameName} // 19. Diz que o texto que aparece aqui é o que está guardado no "gameName".
            onChange={(e) => setGameName(e.target.value)} // 20. Sempre que você apertar uma tecla, ele atualiza o "gameName".
          />
          <button className={style.btnInsert} onClick={handleAddGame}>
            {" "}
            {/* 21. Botão que chama a função de adicionar quando clicado. */}
            Adicionar
          </button>
        </div>
        <div className={style.listContainer}>

          {" "}
          {/* 22. Caixa onde a lista de jogos vai aparecer. */}
          {games.map(
            (
              game // 23. O "map" percorre sua lista de jogos um por um e cria um visual para cada um.
            ) => (
              <div key={game.id}>
                {" "}
                {/* 24. O React precisa que cada item da lista tenha uma "chave" (o ID) para ele não se confundir. */}
                <span>{game.name}</span>{" "}
                {/* 25. Mostra o nome do jogo na tela. */}
                <button onClick={() => handleRemoveGame(game.id)}>
                  Remover
                </button>{" "}
                {/* 26. Botão de remover que avisa qual jogo deve ser deletado através do ID. */}
              </div>
            ),
          )}
          
        </div>
      </main>
    </>
  );
};

export { App };
