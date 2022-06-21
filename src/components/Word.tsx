import styles from "./Word.module.css";

import { ILetter, Letter } from "./Letter";

export interface IWord {
  focused?: boolean;
  letters: ILetter[];
  id?: number;
}

export function Word({ letters = [], id, focused = false }: IWord) {
  return (
    <div
      key={id}
      className={`${styles.wrapper} ${!focused ? styles.disabled : ""}`}
    >
      {letters.map((letter, letterIdx) => (
        <Letter
          key={`${id}=${letterIdx}`}
          status={letter.status}
          rowIdx={id}
          letterIdx={letterIdx}
          letter={letter.letter}
          focused={letter.focused}
        />
      ))}
    </div>
  );
}
