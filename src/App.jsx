import { useState } from "react";
import Board from "./components/Board";
import ColorPalette from "./components/ColorPalette";
import "./App.css";

function App() {
  const [size, setSize] = useState(5);
  const [board, setBoard] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);

  const createBoard = () => {
    const newBoard = Array.from({ length: size }, () =>
      Array(size).fill(null)
    );

    setBoard(newBoard);
    setSelectedColor(0);
  };

  const paintCell = (row, col) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);

      newBoard[row][col] = selectedColor;

      return newBoard;
    });
  };

  return (
    <div className="app">
      <h1>Queens Solver</h1>

      <div className="controls">
        <label htmlFor="size">Number of Queens</label>

        <input
          id="size"
          type="number"
          min="5"
          max="20"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />

        <button onClick={createBoard}>Create Board</button>
      </div>

      {board.length > 0 && (
        <>
          <ColorPalette
            size={size}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />

          <Board
            board={board}
            paintCell={paintCell}
          />
        </>
      )}
    </div>
  );
}

export default App;