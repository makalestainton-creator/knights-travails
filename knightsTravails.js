/* 
  All possible moves, 8 (row 0 is the top of the board so negative row delta = moving up; column 0 is the left edge, so negative column delta = moving left):
  [2, 1] - 2rows down, 1col right
  _______________________________
  [2, -1] - 2rows down, 1col left
  _______________________________
  [-2, 1] - 2rows up, 1col left
  _______________________________
  ...
*/

const possibleMoves = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

/*
  Since the board is 8 X 8, coordinates must stay between 0 and 7
*/

function isValidMove([x, y]) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function knightMoves(start, end) {
  // the queue stores an array of paths e.g., [[0, 0] [2, 1]]
  const queue = [[start]];

  // keep track of visisted coordinates to prevent redundancy and infinite loops
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const path = queue.shift();
    const currentCoord = path[path.length - 1];

    // check if we've reached the destination
    if (currentCoord[0] === end[0] && currentCoord[1] === end[1]) {
      return path;
    }

    for (const [dx, dy] of possibleMoves) {
      const nextX = currentCoord[0] + dx;
      const nextY = currentCoord[1] + dy;

      const nextCoord = [nextX, nextY];

      if (isValidMove(nextCoord) && !visited.has(nextCoord.toString())) {
        visited.add(nextCoord.toString());

        queue.push([...path, nextCoord]);
      }
    }
  }
}

function printKnightMoves(start, end) {
  const path = knightMoves(start, end);

  console.log(`=> You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((coord) => {
    console.log(coord);
  });
}

printKnightMoves([0, 0], [5, 2]);
