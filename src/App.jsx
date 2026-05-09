import style from "./styles/App.module.css";
import { useState, useEffect } from "react";

const App = () => {
  const [gameName, setGameName] = useState("");
  const [games, setGames] = useState([]);

  const handleSubmitGame = () => {
    console.log("handleSubmitGame foi chamado!");

    if (gameName.trim() === "") {
      console.log("Input vazio!");
      return;
    }

    console.log("Digitando o nome: ", gameName);

    const newGame = {
      id: Date.now(),
      name: gameName,
    };

    console.log("Nome do jogo: ", gameName);
    setGames((prevGames) => [...prevGames, newGame]);
    setGameName("");
  };

  useEffect(() => {
    console.log("Jogos: ", games);
  }, [games]);

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
          <button onClick={handleSubmitGame}>Adicionar</button>
        </div>
      </main>
    </>
  );
};

export { App };
