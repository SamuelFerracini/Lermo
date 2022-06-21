import { useEffect } from "react";

import { isMobile } from "react-device-detect";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import styles from "./App.module.css";

import champions from "./resource/wordList.json";
import { useAppStore } from "./stores/app";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Board } from "./components/Board";

export interface IOnKeyPressed {
  key: string;
}

function App() {
  const setLetter = useAppStore((state) => state.setLetter);
  const setHiddenWord = useAppStore((state) => state.setHiddenWord);
  const checkWord = useAppStore((state) => state.checkWord);

  const onKeyPressed = (e: IOnKeyPressed) => {
    if (e.key.toUpperCase() === "Enter".toUpperCase()) checkWord();

    if (e.key.toUpperCase() === "Backspace".toUpperCase()) setLetter("_");

    if (/^[a-zA-Z]{1}$/.test(e.key)) setLetter(e.key.toUpperCase());
  };

  useEffect(() => {
    const randomChampion =
      champions[Math.floor(Math.random() * champions.length)];

    setHiddenWord(randomChampion);
  }, []);

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

  console.log(isMobile);

  return (
    <div className={styles.wrapper} onKeyDown={onKeyPressed} tabIndex={0}>
      <Navbar />
      <Board />
      <Footer />
      <div className={`${styles.keyboardPlace} ${!isMobile && styles.hide}`}>
        {" "}
      </div>
      <div className={`${styles.keyboard} ${!isMobile && styles.hide}`}>
        <Keyboard onKeyPress={handle} layout={keyboardLayout} />
      </div>
    </div>
  );
}

export default App;
