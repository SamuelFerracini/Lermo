import { Navbar } from "./components/Navbar";
import { Board } from "./components/Board";
import { useWordStore } from "./stores/word";

export interface IOnKeyPressed {
  key: string;
}

function App() {
  const setLetter = useWordStore((state) => state.setLetter);

  const onKeyPressed = (e: IOnKeyPressed) => {
    if (e.key.toUpperCase() === "ENTER") {
      console.log("Enter");
    }

    if (/^[a-zA-Z]{1}$/.test(e.key)) setLetter(e.key);
  };

  return (
    <div style={{ height: "100vh" }} onKeyDown={onKeyPressed} tabIndex={0}>
      <Navbar />
      <Board />
    </div>
  );
}

export default App;
