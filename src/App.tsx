import { Navbar } from "./components/Navbar";
import { Board } from "./components/Board";

function App() {
  const onKeyPressed = (e) => {
    console.log(e);
  };

  return (
    <div onKeyDown={onKeyPressed} tabIndex={0}>
      <Navbar />
      <Board />
    </div>
  );
}

export default App;
