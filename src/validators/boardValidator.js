function validateBoard(board, size) {
  // --------------------------------
  // 1. Check board dimensions
  // --------------------------------

  if (!Array.isArray(board) || board.length !== size) {
    return {
      valid: false,
      message: `Board must have exactly ${size} rows.`,
    };
  }

  for (const row of board) {
    if (!Array.isArray(row) || row.length !== size) {
      return {
        valid: false,
        message: `Board must be ${size} × ${size}.`,
      };
    }
  }


  // --------------------------------
  // 2. Check for empty cells
  // --------------------------------

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === null || board[row][col] === undefined) {
        return {
          valid: false,
          message: "Every cell must belong to a region.",
        };
      }
    }
  }


  // --------------------------------
  // 3. Check exactly N regions
  // --------------------------------

  const regions = new Set();

  for (const row of board) {
    for (const cell of row) {
      regions.add(cell);
    }
  }

  if (regions.size !== size) {
    return {
      valid: false,
      message: `The board must contain exactly ${size} regions. Found ${regions.size}.`,
    };
  }


  // --------------------------------
  // 4. Check region connectivity
  // --------------------------------

  for (const region of regions) {
    const result = isRegionConnected(board, size, region);

    if (!result.connected) {
      return {
        valid: false,
        message: `Region ${region + 1} is not connected.`,
      };
    }
  }


  // --------------------------------
  // Everything passed
  // --------------------------------

  return {
    valid: true,
    message: "Valid board. Ready to solve.",
  };
}


/*
 * Check whether every cell belonging to a
 * particular region can be reached using
 * only up/down/left/right movement.
 */
function isRegionConnected(board, size, region) {
  let startRow = -1;
  let startCol = -1;
  let totalCells = 0;

  // Find a starting cell and count region cells
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === region) {
        totalCells++;

        if (startRow === -1) {
          startRow = row;
          startCol = col;
        }
      }
    }
  }

  const visited = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );

  const queue = [[startRow, startCol]];

  visited[startRow][startCol] = true;

  let visitedCount = 0;

  // 4-direction movement
  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
  ];

  while (queue.length > 0) {
    const [row, col] = queue.shift();

    visitedCount++;

    for (const [rowOffset, colOffset] of directions) {
      const newRow = row + rowOffset;
      const newCol = col + colOffset;

      // Outside board
      if (
        newRow < 0 ||
        newRow >= size ||
        newCol < 0 ||
        newCol >= size
      ) {
        continue;
      }

      // Already visited
      if (visited[newRow][newCol]) {
        continue;
      }

      // Different region
      if (board[newRow][newCol] !== region) {
        continue;
      }

      visited[newRow][newCol] = true;

      queue.push([newRow, newCol]);
    }
  }

  return {
    connected: visitedCount === totalCells,
  };
}

export default validateBoard;