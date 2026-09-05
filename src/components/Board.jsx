function Board({ board, paintCell }) {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${board.length}, 1fr)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className={`cell region-${cell}`}
            onClick={() => paintCell(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}

export default Board;