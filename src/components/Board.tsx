import styles from "./Board.module.css";

import { useState } from "react";

import { Word } from "./Word";

const INITIAL_WORDS = [
  [
    { letter: "A", isFocused: false },
    { letter: "B", isFocused: false },
    { letter: "C", isFocused: false },
    { letter: "D", isFocused: false },
    { letter: "E", isFocused: false },
  ],
  [
    { letter: "A", isFocused: false },
    { letter: "B", isFocused: false },
    { letter: "C", isFocused: false },
    { letter: "D", isFocused: false },
    { letter: "E", isFocused: false },
  ],
  [
    { letter: "_", isFocused: false },
    { letter: "_", isFocused: false },
    { letter: "_", isFocused: false },
    { letter: "_", isFocused: false },
    { letter: "_", isFocused: false },
  ],
];

export function Board() {
  const [words, setWords] = useState(INITIAL_WORDS);

  return (
    <div className={styles.board}>
      {words.map((word, wordIndex) => (
        <Word key={wordIndex} id={wordIndex} letters={word} />
      ))}
    </div>
  );
}
