function solveQueens(board) {
  const size = board.length;

  const queens = [];

  // Track which columns already contain a queen
  const usedColumns = new Set();

  // Track which regions already contain a queen
  const usedRegions = new Set();

  const solve = (row) => {
    // --------------------------------
    // Base case
    // --------------------------------

    if (row === size) {
      return true;
    }

    // --------------------------------
    // Try every column in this row
    // --------------------------------

    for (let col = 0; col < size; col++) {

      const region = board[row][col];

      // Column already has a queen
      if (usedColumns.has(col)) {
        continue;
      }

      // Region already has a queen
      if (usedRegions.has(region)) {
        continue;
      }

      // Check whether this queen touches
      // the previously placed queens
      if (isAdjacentToQueen(row, col, queens)) {
        continue;
      }

      // --------------------------------
      // Place queen
      // --------------------------------

      queens.push([row, col]);

      usedColumns.add(col);
      usedRegions.add(region);

      // --------------------------------
      // Recurse into next row
      // --------------------------------

      if (solve(row + 1)) {
        return true;
      }

      // --------------------------------
      // Backtrack
      // --------------------------------

      queens.pop();

      usedColumns.delete(col);
      usedRegions.delete(region);
    }

    return false;
  };

  const solved = solve(0);

  if (!solved) {
    return null;
  }

  return queens;
}


/*
 * Check whether the new queen would touch
 * any previously placed queen.
 *
 * Queens cannot be adjacent horizontally,
 * vertically or diagonally.
 */
function isAdjacentToQueen(row, col, queens) {
  for (const [queenRow, queenCol] of queens) {

    const rowDifference = Math.abs(row - queenRow);
    const colDifference = Math.abs(col - queenCol);

    if (
      rowDifference <= 1 &&
      colDifference <= 1
    ) {
      return true;
    }
  }

  return false;
}


export default solveQueens;