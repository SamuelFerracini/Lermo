import { useEffect } from "react";

import styles from "./App.module.css";

import champions from "./resource/wordList.json";
import { useAppStore } from "./stores/app";

import { Message } from "./components/Message";
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

  return (
    <div className={styles.wrapper} onKeyDown={onKeyPressed} tabIndex={0}>
      <Navbar />
      <Message />
      <Board />
      <Footer />
    </div>
  );
}

export default App;
