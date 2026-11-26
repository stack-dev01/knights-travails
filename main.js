const MOVES = [
  [2, 1], [2, -1], [-2, 1], [-2, -1],
  [1, 2], [1, -2], [-1, 2], [-1, -2],
];

const isOnBoard = ([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7;

const getNextSquares = ([x, y]) => {
  const next = [];

  for (const [dx, dy] of MOVES) {
    const square = [x + dx, y + dy];
    if (isOnBoard(square)) {
      next.push(square);
    }
  }

  return next;
};

const knightMoves = (start, end) => {
  if (!isOnBoard(start) || !isOnBoard(end)) {
    console.log("Both squares must be on the board (numbers from 0 to 7).");
    return;
  }

  const queue = [{ square: start, path: [start] }];
  const visited = new Set([start.join(",")]);

  while (queue.length > 0) {
    const { square, path } = queue.shift(); // take the first one in line

    // did we reach the target?
    if (square[0] === end[0] && square[1] === end[1]) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((step) => console.log(`[${step}]`));
      return path;
    }

    // otherwise, add every unvisited next square to the back of the line
    for (const next of getNextSquares(square)) {
      const key = next.join(",");
      if (!visited.has(key)) {
        visited.add(key);
        queue.push({ square: next, path: [...path, next] });
      }
    }
  }
};

knightMoves([0, 0], [1, 2]);
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [7, 7]);
knightMoves([3, 3], [3, 3]);

knightMoves([0, 0], [8, 8]);   // message: off the board
knightMoves([-1, 2], [3, 3]);  // message: off the board
knightMoves([7, 0], [0, 7]);   // a valid long trip