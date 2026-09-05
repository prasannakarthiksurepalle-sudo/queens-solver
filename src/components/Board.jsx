import { useRef } from "react";

function Board({ board, paintCell }) {
  const isPainting = useRef(false);
  const paintedCells = useRef(new Set());

  const paint = (row, col) => {
    const cellKey = `${row}-${col}`;

    // Prevent repeatedly painting the same cell during one drag
    if (paintedCells.current.has(cellKey)) return;

    paintedCells.current.add(cellKey);
    paintCell(row, col);
  };

  const startPainting = (row, col) => {
    isPainting.current = true;
    paintedCells.current.clear();

    paint(row, col);
  };

  const continuePainting = (row, col) => {
    if (!isPainting.current) return;

    paint(row, col);
  };

  const stopPainting = () => {
    isPainting.current = false;
    paintedCells.current.clear();
  };

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${board.length}, 1fr)`,
      }}
      onMouseUp={stopPainting}
      onMouseLeave={stopPainting}
      onTouchEnd={stopPainting}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className={`cell region-${cell}`}
            onMouseDown={(e) => {
              e.preventDefault();
              startPainting(rowIndex, colIndex);
            }}
            onMouseEnter={() => continuePainting(rowIndex, colIndex)}
            onTouchStart={(e) => {
              e.preventDefault();
              startPainting(rowIndex, colIndex);
            }}
            onTouchMove={(e) => {
              e.preventDefault();

              const touch = e.touches[0];
              const element = document.elementFromPoint(
                touch.clientX,
                touch.clientY
              );

              if (element?.dataset?.row && element?.dataset?.col) {
                continuePainting(
                  Number(element.dataset.row),
                  Number(element.dataset.col)
                );
              }
            }}
            data-row={rowIndex}
            data-col={colIndex}
          />
        ))
      )}
    </div>
  );
}

export default Board;

