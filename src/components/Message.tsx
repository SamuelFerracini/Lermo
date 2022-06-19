import { EGameState, useAppStore } from "../stores/app";

import styles from "./Message.module.css";

export function Message() {
  const gameState = useAppStore((state) => state.gameState);

  const handleClick = () => {
    location.reload();
  };

  return (
    <>
      {gameState != EGameState.PLAYING ? (
        <div className={styles.wrapper}>
          <span>
            {gameState === EGameState.LOSE
              ? "Você perdeu!"
              : gameState === EGameState.WON
              ? "Você ganhou!"
              : ""}
          </span>

          <button onClick={handleClick}>Reiniciar</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
