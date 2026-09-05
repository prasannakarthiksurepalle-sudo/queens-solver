import { useState } from "react";
import Board from "./components/Board";
import ColorPalette from "./components/ColorPalette";
import "./App.css";

function App() {
  const [size, setSize] = useState(5);
  const [board, setBoard] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);

  const createBoard = () => {
    const safeSize = Math.min(20, Math.max(5, Number(size) || 5));
    setSize(safeSize);

    const newBoard = Array.from({ length: safeSize }, () =>
      Array(safeSize).fill(null)
    );

    setBoard(newBoard);
    setSelectedColor(0);
  };

  const paintCell = (row, col) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((currentRow) => [...currentRow]);
      newBoard[row][col] = selectedColor;
      return newBoard;
    });
  };

  return (
    <main className="app">
      <div className="app-shell">
        <header className="hero">
          <div className="brand-mark" aria-hidden="true">♛</div>
          <div className="hero-copy">
            <p className="eyebrow">QUEENS PUZZLE</p>
            <h1>Queens Puzzle Solver</h1>
            <p className="subtitle">
              Build your board, choose a color, and place your queens with precision.
            </p>
          </div>
        </header>

        <section className="workspace-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">SETUP</p>
              <h2>Configure your board</h2>
            </div>
            <span className="size-badge">{size} × {size}</span>
          </div>

          <div className="controls">
            <label htmlFor="size">
              <span>Number of queens</span>
              <small>Choose between 5 and 20</small>
            </label>

            <div className="input-group">
              <input
                id="size"
                type="number"
                min="5"
                max="20"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") createBoard();
                }}
                aria-describedby="size-help"
              />
              <span id="size-help" className="input-suffix">queens</span>
            </div>

            <button className="primary-button" onClick={createBoard}>
              <span>Generate board</span>
              <span className="button-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        {board.length > 0 ? (
          <section className="workspace-card board-section">
            <div className="section-heading">
              <div>
                <p className="section-kicker">WORKSPACE</p>
                <h2>Design your solution</h2>
              </div>
              <div className="live-status">
                <span className="status-dot" />
                Board ready
              </div>
            </div>

            <div className="palette-panel">
              <div>
                <h3>Choose a color</h3>
                <p>Pick a color, then click any square on the board.</p>
              </div>
              <ColorPalette
                size={size}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </div>

            <div className="board-stage">
              <div className="board-frame">
                <Board board={board} paintCell={paintCell} />
              </div>
            </div>

            <div className="tip">
              <span className="tip-icon" aria-hidden="true">i</span>
              <span>
                Each square can be recolored at any time. Experiment with different
                arrangements to build your solution.
              </span>
            </div>
          </section>
        ) : (
          <section className="empty-state">
            <div className="empty-icon" aria-hidden="true">♛</div>
            <h2>Your board is waiting</h2>
            <p>
              Select the number of queens above and generate a board to get started.
            </p>
          </section>
        )}

        <footer className="app-footer">
          <span>N-Queens Playground</span>
          <span>•</span>
          <span>{size} queens</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
