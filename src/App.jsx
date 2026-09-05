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

  const resetBoard = () => {
  if (board.length === 0) return;

  const emptyBoard = Array.from({ length: size }, () =>
    Array(size).fill(null)
  );

  setBoard(emptyBoard);
};

  return (
    <main className="app">
      <div className="app-layout">

        {/* LEFT PANEL */}
        <aside className="rules-panel">

          <div className="rules-brand">
            <div className="rules-brand-mark">♛</div>

            <div>
              <p className="eyebrow">QUEENS PUZZLE</p>
              <h1>Queens</h1>
            </div>
          </div>

          <div className="rules-content">

            <section className="rules-section">
              <p className="section-kicker">HOW TO PLAY</p>

              <h2>Place the queens with precision.</h2>

              <p className="rules-description">
                Create a colored board and find a valid placement for all
                queens while following every rule.
              </p>
            </section>

            <section className="rules-section">
              <p className="section-kicker">RULES</p>

              <div className="rule-list">

                <div className="rule">
                  <span className="rule-number">01</span>

                  <div>
                    <h3>One queen per row</h3>
                    <p>
                      Every row must contain exactly one queen.
                    </p>
                  </div>
                </div>

                <div className="rule">
                  <span className="rule-number">02</span>

                  <div>
                    <h3>One queen per column</h3>
                    <p>
                      Every column must contain exactly one queen.
                    </p>
                  </div>
                </div>

                <div className="rule">
                  <span className="rule-number">03</span>

                  <div>
                    <h3>One queen per region</h3>
                    <p>
                      Each colored region must contain exactly one queen.
                    </p>
                  </div>
                </div>

                <div className="rule">
                  <span className="rule-number">04</span>

                  <div>
                    <h3>No touching</h3>
                    <p>
                      Queens cannot touch each other, even diagonally.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            <section className="rules-section workflow-section">
              <p className="section-kicker">HOW IT WORKS</p>

              <div className="workflow">

                <div className="workflow-step">
                  <span>1</span>
                  <p>Choose your board size.</p>
                </div>

                <div className="workflow-step">
                  <span>2</span>
                  <p>Paint the board into regions.</p>
                </div>

                <div className="workflow-step">
                  <span>3</span>
                  <p>Validate the regions.</p>
                </div>

                <div className="workflow-step">
                  <span>4</span>
                  <p>Run the backtracking solver.</p>
                </div>

              </div>
            </section>

          </div>

          <div className="rules-footer">
            <span>Queens Puzzle Solver</span>
            <span>•</span>
            <span>5–20</span>
          </div>

        </aside>


        {/* RIGHT PANEL */}
        <section className="workspace-panel">

          <header className="workspace-header">

            <div>
              <p className="eyebrow">QUEENS PUZZLE</p>

              <h1>Queens Puzzle Solver</h1>

              <p className="subtitle">
                Build your board, define the regions, and let the solver
                find the queens.
              </p>
            </div>

            {board.length > 0 && (
              <div className="live-status">
                <span className="status-dot"></span>
                Board ready
              </div>
            )}

          </header>


          {/* BOARD SETUP */}
          <section className="workspace-card">

            <div className="section-heading">

              <div>
                <p className="section-kicker">SETUP</p>
                <h2>Configure your board</h2>
              </div>

              <span className="size-badge">
                {size} × {size}
              </span>

            </div>

            <div className="controls">

              <label htmlFor="size">

                <span>Board size</span>

                <small>
                  Choose between 5 and 20
                </small>

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
                    if (e.key === "Enter") {
                      createBoard();
                    }
                  }}
                />

                <span className="input-suffix">
                  size
                </span>

              </div>

              <button
                className="primary-button"
                onClick={createBoard}
              >
                <span>Generate board</span>
                <span className="button-arrow">→</span>
              </button>

            </div>

          </section>


          {/* BOARD WORKSPACE */}
          {board.length > 0 ? (

            <section className="workspace-card board-section">

              <div className="section-heading">

                <div>
                  <p className="section-kicker">WORKSPACE</p>
                  <h2>Design your regions</h2>
                </div>

              </div>


              {/* COLORS */}
              <div className="palette-panel">

                <div className="palette-info">

                  <h3>Choose a region color</h3>

                  <p>
                    Select a color, then click cells on the board.
                  </p>

                </div>

                <ColorPalette
                  size={size}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />

              </div>


              {/* BOARD */}
              <div className="board-stage">

                <div className="board-frame">

                  <Board
                    board={board}
                    paintCell={paintCell}
                  />

                </div>

              </div>
              <div className="board-actions">

                <button
                  className="secondary-button"
                  onClick={resetBoard}
                >
                Reset board
                </button>

              </div>

              <div className="tip">

                <span className="tip-icon">i</span>

                <span>
                
                  Paint every cell using exactly {size} region colors.
                  Each region must form one connected area.
                  
                </span>

              </div>

            </section>

          ) : (

            <section className="empty-state">

              <div className="empty-icon">
                ♛
              </div>

              <h2>Your board is waiting</h2>

              <p>
                Choose a board size between 5 and 20 and generate your
                puzzle to get started.
              </p>

            </section>

          )}

        </section>

      </div>
    </main>
  );
}

export default App;