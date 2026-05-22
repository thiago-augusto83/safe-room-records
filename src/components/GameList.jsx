import style from "../styles/GameList.module.css";

const GameList = ({ games, onRemove, onEdit, onCancelEdit }) => {
  return (
    <div className={style.listContainer}>
      {games.map((game) => (
        <div key={game.id} className={style.gameCard}>
          <span>{game.name}</span>

          <div className={style.actions}>
            <button onClick={() => onRemove(game.id)}>Remover</button>
            <button onClick={() => onEdit(game)}>Editar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { GameList };
