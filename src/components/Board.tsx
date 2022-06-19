import styles from "./Board.module.css";

import { Word } from "./Word";
import { useAppStore } from "../stores/app";

export function Board() {
  const words = useAppStore((state) => state.words);

  return (
    <div className={styles.board}>
      {words.map((word, wordIndex) => (
        <Word
          key={wordIndex}
          id={wordIndex}
          letters={word.letters}
          focused={word.focused}
        />
      ))}
    </div>
  );
}
