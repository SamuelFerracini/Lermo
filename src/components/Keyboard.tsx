import SimpleKeyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import { isMobile } from "react-device-detect";

import styles from "./Keyboard.module.css";

import { useAppStore } from "../stores/app";

export function Keyboard() {
  const setLetter = useAppStore((state) => state.setLetter);
  const setHiddenWord = useAppStore((state) => state.setHiddenWord);
  const checkWord = useAppStore((state) => state.checkWord);

  const handle = (letterPressed: string) => {
    if (letterPressed === "{enter}") checkWord();

    if (letterPressed === "{bksp}") setLetter("_");

    if (/^[a-zA-Z]{1}$/.test(letterPressed))
      setLetter(letterPressed.toUpperCase());
  };

  const keyboardLayout = {
    default: [
      "q w e r t y u i o p {bksp}",
      "a s d f g h j k l {enter}",
      "z x c v b n m",
    ],
  };

  return (
    <>
      <div className={`${styles.keyboardPlace} ${!isMobile && styles.hide}`}>
        -
      </div>
      <div className={`${styles.keyboard} ${!isMobile && styles.hide}`}>
        <SimpleKeyboard
          onKeyPress={handle}
          layout={keyboardLayout}
          display={{
            "{bksp}": "⌫",
            "{enter}": "↵",
          }}
        />
      </div>
    </>
  );
}
