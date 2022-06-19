import styles from "./Board.module.css";

import { Word } from "./Word";
import { useWordStore } from "../stores/word";

export function Board() {
  const words = useWordStore((state) => state.words);

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
