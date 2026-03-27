// 4
import { useEffect, useState } from "react";
import style from "./styles/App.module.css";

// 1
const App = () => {
  // 11
  const [gameName, setGameName] = useState("");
  // 12
  // const [games, setGames] = useState([]);
  // 33 -
  const [games, setGames] = useState(() => {
    // Quando o app começa, tente carregar os jogos salvos no navegador
    const storedGames = localStorage.getItem("games");
    // Se não tiver nada salvo começa com uma lista fazia
    if (!storedGames) return [];
    // Com o JSON transforme o texto em objeto
    return JSON.parse(storedGames);
  });

  // 34 - Sempre que a lista de jogos mudar, salve ela no navegador
  // useEffect - Serve para executar algo altomaticamente - efeitos colaterais
  // Quando algo acontecer, execute isso.
  useEffect(() => {
    // Aqui você está salvando algo no navegador
    // O localStorage funciona como um banco simples
    // localStorage("chave", valor)
    // "games" é o nome da gaveta onde você salva os daos
    // JSON.stringfy(games) - transforma o array em texto
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  // 26
  const [editingGame, setEditingGameId] = useState(null);

  // 13 - Função handleSubmitGame
  const handleSubmitGame = () => {
    // 14 - Testa se algo foi digitado no INPUT TEXT
    if (gameName.trim() === "") return console.log("Vazio!");

    // 29 - Adicionando funcionalidades à função para que o EDIT dê certo
    // Estou editando algum jogo???
    // editingGameId guarda o ID de um jogo sendo editado
    // se for null -> NÃO está editando
    // se tiver valor -> ESTÁ editando
    // Exemplo:
    // editingGameId = null      → isEditing = false
    // editingGameId = 12345     → isEditing = true
    const isEditing = editingGame !== null;

    // 30 - Se estiver no modo edição
    if (isEditing) {
      // Modo edição
      // Vamos pegar a lista atual de jogos
      setGames((prevGames) =>
        // Vamos percorrer todos os jogos
        prevGames.map((game) =>
          // game.id === editingGame - "Esse jogo é o que estou editando???"
          // ? { ...game, name: gameName } - "Se for o jogo certo -> atualiza o nome"
          // : game - "Senão -> Mantem igual"
          game.id === editingGame ? { ...game, name: gameName } : game,
        ),
      );
      // O botão volta para adicionar
      // O sistema sai do modo edição
      setEditingGameId(null);
    } else {
      // 31 -
      // Modo criação
      // Se não estou editando, estou criando
      const newGame = {
        id: Date.now(),
        name: gameName,
      };
      setGames((prevGames) => [...prevGames, newGame]);
    }
    // 32
    setGameName("");

    // 15 - Cria um objeto que vai receber os dados do jogo
    // const newGame = {
    //   id: Date.now(),
    //   name: gameName,
    // };

    // 16 - Renderiza os dados do jogo no listContainerApp
    // setGames((prevGames) => [...prevGames, newGame]);
  };

  // 25 - Remove o jogo
  // setGames - É a função que atualiza o estado GAMES
  // games (valor atual) - setGames(função que muda o valor)
  // prevGames - atualização baseada no estado anterior, é importante por que garante que você use
  // sempre o valor mais recente.
  // Filter - Cria uma nova lista baseada nas condições do filtro aplicado
  // Se retornar TRUE - Fica na lista
  // Se retornar FALSE - Sai da lista
  // (game) => game.id !== id - Peque a lista de jogos e mantenha apenas os jogos que não tem a ID
  // que eu quero remover
  const handleRemoveGame = (id) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
  };

  // 27 - Editando
  const handleEditGame = (game) => {
    setGameName(game.name);
    setEditingGameId(game.id);
  };

  // 17 - useEffect utilizado para testar com o console.log()
  useEffect(() => {
    console.log(games);
  }, [games]);

  // 2 - return <><main></main></>
  return (
    <>
      {/* 5 - className no main */}
      <main className={style.appContainer}>
        {/* 6 */}
        <h1>Safe Room Records</h1>
        {/* 7 - <div></div> </input type=text> <button></button>*/}
        {/* 8 - clasName na div */}
        {/* 18 - VALUE: Aqui é onde a mágica do React começa. 
                 - Em vez do navegador gerenciar o texto sozinho, vocẽ está dizendo: 
                 "O que aparecer escrito aqui, deve ser exatamente o que estiver guardado na
                 variável gameName".
                 - Se você mudar gameName via código, o texto na tela muda instantaniamente. */}
        {/* 19 - onChange: Este é o "vigia" do input. Sem ele, você tentaria digitar e nada
                  aconteceria (por que o value está travado em gameName) */}
        {/* 20 - (e): É o objeto de evento que contém todas as informações sobre o que aconteceu */}
        {/* 21 - e.target.value: É o valor atualizado que o usuário acabou de digitar */}
        {/* 22 - setGameName(...): É a função que atualiza o estado */}
        <div className={style.insertDataContainer}>
          <input
            type="text"
            placeholder="Digite o nome do jogo..."
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          {/* 14 - Para os primeiros testes com handleSubmitGame */}
          <button onClick={handleSubmitGame}>
            {/* 32 - Alteramos os dados do botão para o modo editar */}
            {editingGame !== null ? "Salvar" : "Adicionar"}
          </button>
        </div>
        {/* 9 - div*/}
        {/* 10 - className na div */}
        <div className={style.listContainer}>
          {/* 23 - Renderiza o conteúdo de games na lista (listContainer) */}
          {games.map((game) => (
            // 24 - Adiciona uma div com: id para que o React possa identificar.
            //                            <span>nome do jogo</span>
            //                            button -> Remover / button -> Editar
            <div key={game.id}>
              <span>{game.name}</span>
              <button onClick={() => handleRemoveGame(game.id)}>Remover</button>
              {/* 28 - Adicionar onClick ao botão editar */}
              <button onClick={() => handleEditGame(game)}>Editar</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

// 3
export { App };
