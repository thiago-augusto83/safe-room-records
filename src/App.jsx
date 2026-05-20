// 2. Importação dos estilos e estados.
import style from "./styles/App.module.css";
import { useEffect, useState } from "react";

// 1. Componente principal da aplicação.
const App = () => {
  // 8. State gameName e games
  const [gameName, setGameName] = useState("");

  // 31. Carrega os jogos do localStorage quando o componente é montado.
  // Declara o estado games com seu atualizador setGames.
  // Em vez de passar um valor direto ao useState, passa uma função arrow
  // isso se chama lazy initialization (inicialização preguiçosa).
  // Essa função é executada apenas uma vez, na primeira renderização do componente,
  // evitando que o localStorage seja lido desnecessariamente a cada re-renderização.
  // A função roda uma vez só para definir o valor inicial — depois disso,
  // quem mantém os dados vivos na tela é o próprio sistema de estado do React, não o localStorage.
  // O papel de cada um
  // localStorage → é o "HD" da aplicação. Guarda os dados mesmo após fechar o navegador.
  // Mas o React não o monitora automaticamente.
  // useState → é a "memória RAM" do componente. Sempre que muda, o React re-renderiza a tela com os dados novos.
  const [games, setGames] = useState(() => {
    // Busca no localStorage do navegador o item com a chave "games". O resultado pode ser:
    // Uma string JSON (se já existir algo salvo)
    // null (se nunca foi salvo nada)
    const storedGames = localStorage.getItem("games");
    if (!storedGames) return [];
    // Se existir algo salvo, converte a string JSON de volta para um array de objetos JavaScript
    // e o retorna como valor inicial do estado.
    // O localStorage só armazena strings, por isso é necessário
    // o JSON.parse para transformar "[{...}]" em [{...}].
    return JSON.parse(storedGames);
  });

  // 19. State de feedback
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  // 23. State editingGameId
  const [editingGameId, setEditingGameId] = useState(null);

  // 32. useEffect para salvar no localStorage
  // A função dentro do useEffect agora recebe diretamente o valor atual do estado
  // (games). Isso acontece porque o React atualiza os estados de forma síncrona
  // dentro do mesmo ciclo de renderização.
  // O [games] no final é o array de dependências. Isso faz com que o efeito seja
  // reexecutado sempre que o valor de `games` mudar na tela.
  // 1ª renderização
  //       ↓
  // useState lê o localStorage → carrega os jogos salvos no estado
  //       ↓
  // React renderiza a lista com esses jogos
  //       ↓
  // Usuário adiciona/edita/remove um jogo
  //      ↓
  // setGames() atualiza o estado → React re-renderiza automaticamente
  //    ↓
  // useEffect detecta a mudança em "games" → salva no localStorage
  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

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
      // prevGames: É o valor atual do estado antes de ser alterado.
      setGames((prevGames) =>
        // prevGames.map: Itera sobre todos os jogos do estado.
        // game: É cada jogo do estado.
        // game.id === editingGameId: Verifica se o jogo atual é o que está sendo editado.
        // { ...game, name: gameName }: Cria um novo objeto com o nome do jogo atualizado.
        // : game: Se não for o jogo que está sendo editado, retorna o jogo original.
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

    // 11. Objeto que será adicionado ao state como novo jogo.
    //     Vai mudar ao longo do projeto.
    // const newGame = {
    //   id: Date.now(),
    //   name: gameName,
    // };

    // 12. Adição do novo jogo ao state.
    //     Vai mudar ao longo do projeto.
    // setGames((prevGames) => [...prevGames, newGame]);
    // showFeedback("Jogo adicionado com sucesso.", "success");
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

  // 30. Função handleCancelEdit
  const handleCancelEdit = () => {
    setEditingGameId(null);
    setGameName("");
    showFeedback("Edição cancelada.", "info");
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
            // 28. onKeyDown - Evento do React disparado no momento em que o usuário
            // pressiona qualquer tecla enquanto o campo está focado.
            // (e) => Função arrow que recebe e — o objeto do evento —, que contém informações
            // sobre qual tecla foi pressionada, entre outras coisas.
            // e.key === "Enter" Acessa a propriedade key do evento e verifica se a
            // tecla pressionada foi o Enter. Retorna true ou false.
            // && Operador lógico "E". Em JavaScript, ele tem um comportamento especial
            // chamado short-circuit (curto-circuito):
            // Se o lado esquerdo for false → para tudo ali, não executa o lado direito
            // Se o lado esquerdo for true → executa o lado direito
            onKeyDown={(e) => e.key === "Enter" && handleSubmitGame()}
          />
          {/* 7. Botão para adicionar o jogo. */}
          {/* 27. Botão que alterna entre "Adicionar" e "Salvar". */}
          <button onClick={handleSubmitGame}>
            {editingGameId !== null ? "Salvar" : "Adicionar"}
          </button>

          {/* 29. Botão Cancelar - aparece somente quando estiver editando. */}
          {/* && Operador lógico "E". Em JavaScript, ele tem um comportamento especial
             chamado short-circuit (curto-circuito):
             Se o lado esquerdo for false → para tudo ali, não executa o lado direito
             Se o lado esquerdo for true → executa o lado direito */}
          {/* Ou seja, vai exibir o botão cancelar somente quando editingGameId for !== null */}
          {editingGameId !== null && (
            <button className={style.btnCancel} onClick={handleCancelEdit}>
              Cancelar
            </button>
          )}
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
