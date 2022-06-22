import { useEffect } from "react";

import styles from "./App.module.css";

import champions from "./resource/wordList.json";
import { useAppStore } from "./stores/app";

import { Keyboard } from "./components/Keyboard";
import { Alert } from "./components/Alert";
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
  const setNextLetterFocused = useAppStore(
    (state) => state.setNextLetterFocused
  );

  const onKeyPressed = (e: IOnKeyPressed) => {
    const upperKeyPressed = e.key.toUpperCase();

    if (["ENTER"].includes(upperKeyPressed)) checkWord();

    if (["BACKSPACE", "DELETE"].includes(upperKeyPressed)) setLetter("_");

    if (["ARROWLEFT", "ARROWRIGHT"].includes(upperKeyPressed)) {
      const directions: Record<string, string> = {
        ARROWLEFT: "left",
        ARROWRIGHT: "right",
      };

      setNextLetterFocused(directions[upperKeyPressed]);
    }

    if (/^[A-Z]{1}$/.test(upperKeyPressed)) setLetter(upperKeyPressed);
  };

  useEffect(() => {
    const randomChampion =
      champions[Math.floor(Math.random() * champions.length)];

    setHiddenWord(randomChampion);
  }, []);

  return (
    <div className={styles.wrapper} onKeyDown={onKeyPressed} tabIndex={0}>
      <Navbar />
      <Alert />
      <Board />
      <Footer />
      <Keyboard />
    </div>
  );
}

export default App;
