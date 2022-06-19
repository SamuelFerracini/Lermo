import styles from "./Word.module.css";

import { ILetter, Letter } from "./Letter";

export interface IWord {
  letters: ILetter[];
  id?: number | string;
}

export function Word({ letters = [], id }: IWord) {
  return (
    <div key={id} className={styles.wrapper}>
      {letters.map((letter, letterIndex) => (
        <Letter
          key={`${id}-${letterIndex}`}
          letter={letter.letter}
          focused={letter.focused}
        />
      ))}
    </div>
  );
}
