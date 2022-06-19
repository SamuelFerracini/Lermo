import styles from "./Letter.module.css";

import { useState } from "react";

export interface ILetter {
  letter?: string | undefined;
  focused?: boolean;
  id?: number | string;
}

export function Letter({ letter, focused = false, id }: ILetter) {
  const [isFocused, setFocused] = useState(focused);

  const handleClick = () => {
    setFocused(true);
  };

  return (
    <div
      key={id}
      onClick={handleClick}
      className={isFocused ? styles.wrapperFocused : styles.wrapper}
    >
      <span className={styles.letter}>{letter}</span>
    </div>
  );
}
