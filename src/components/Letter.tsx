import styles from "./Letter.module.css";

import { useAppStore } from "../stores/app";

export enum ELetterStatus {
  EMPTY,
  RIGHT,
  WRONG_PLACE,
  WRONG,
}

export interface ILetter {
  letterIdx?: number;
  letter?: string | undefined;
  focused?: boolean;
  rowIdx?: number;
  status?: ELetterStatus;
}

export function Letter({
  letter,
  focused = false,
  letterIdx,
  rowIdx,
  status = ELetterStatus.EMPTY,
}: ILetter) {
  const setLetterFocus = useAppStore((state) => state.setLetterFocus);

  const handleClick = () => {
    setLetterFocus(rowIdx as number, letterIdx as number);
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
      tabIndex={0}
      key={`${rowIdx}-${letterIdx}`}
      onClick={handleClick}
      className={`${styles.wrapper} ${
        focused && status === ELetterStatus.EMPTY ? styles.wrapperFocused : ""
      } ${getClass(status)}`}
    >
      <span className={styles.letter}>{letter}</span>
    </div>
  );
}
