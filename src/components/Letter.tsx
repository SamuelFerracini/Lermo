import styles from "./Letter.module.css";

import { useState } from "react";

export enum ELetterStatus {
  EMPTY,
  RIGHT,
  WRONG_PLACE,
  WRONG,
}

export interface ILetter {
  letter?: string | undefined;
  focused?: boolean;
  id?: number | string;
  status?: ELetterStatus;
}

export function Letter({
  letter,
  focused = false,
  id,
  status = ELetterStatus.EMPTY,
}: ILetter) {
  const [isFocused, setFocused] = useState(focused);

  const handleClick = () => {
    setFocused(!isFocused);
  };

  const getClass = (status: ELetterStatus) => {
    switch (status) {
      case ELetterStatus.RIGHT:
        return styles.wrapperGreen;
      case ELetterStatus.WRONG_PLACE:
        return styles.wrapperYellow;
      case ELetterStatus.WRONG:
        return styles.wrapperGray;
      default:
        return styles.wrapperEmpty;
    }
  };

  return (
    <div
      key={id}
      onClick={handleClick}
      className={`${styles.wrapper} ${
        isFocused && status === ELetterStatus.EMPTY && styles.wrapperFocused
      } ${getClass(status)}`}
    >
      <span className={styles.letter}>{letter}</span>
    </div>
  );
}
