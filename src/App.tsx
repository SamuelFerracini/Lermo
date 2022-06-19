import { useEffect } from "react";

import { Navbar } from "./components/Navbar";
import { Board } from "./components/Board";
import { useWordStore } from "./stores/word";

import champions from "./resource/champions.json";

export interface IOnKeyPressed {
  key: string;
}

function App() {
  const setLetter = useWordStore((state) => state.setLetter);
  const setHiddenWord = useWordStore((state) => state.setHiddenWord);

  const onKeyPressed = (e: IOnKeyPressed) => {
    if (e.key.toUpperCase() === "ENTER") {
      console.log("Enter");
    }

    if (e.key.toUpperCase() === "Backspace".toUpperCase()) setLetter("_");

    if (/^[a-zA-Z]{1}$/.test(e.key)) setLetter(e.key);
  };

  useEffect(() => {
    const randomChampion =
      champions[Math.floor(Math.random() * champions.length)];

    setHiddenWord(randomChampion);
  }, []);

  return (
    <div style={{ height: "100vh" }} onKeyDown={onKeyPressed} tabIndex={0}>
      <Navbar />
      <Board />
    </div>
  );
}

export default App;
