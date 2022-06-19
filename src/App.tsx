import { useEffect } from "react";

import styles from "./App.module.css";

import champions from "./resource/champions.json";
import { useAppStore } from "./stores/app";

import { Message } from "./components/Message";
import { Navbar } from "./components/Navbar";
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

    console.log(randomChampion);

    setHiddenWord(randomChampion);
  }, []);

  return (
    <div className={styles.wrapper} onKeyDown={onKeyPressed} tabIndex={0}>
      <Navbar />
      <Board />
      <Message />
    </div>
  );
}

export default App;
