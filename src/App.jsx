// 4
import style from "./styles/App.module.css";

// 1
const App = () => {
  // 2 - return <><main></main></>
  return (
    <>
      {/* 5 - className no main */}
      <main className={style.appContainer}>
        {/* 6 */}
        <h1>Safe Room Records</h1>
        {/* 7 - <div></div> </input type=text> <button></button>*/}
        {/* 8 - clasName na div */}
        <div className={style.insertDataContainer}>
          <input type="text" placeholder="Digite o nome do jogo..." />
          <button>Adicionar</button>
        </div>
        {/* 9 - div*/}
        {/* 10 - className na div */}
        <div className={style.listContainer}>
          
        </div>
      </main>
    </>
  );
};

// 3
export { App };
