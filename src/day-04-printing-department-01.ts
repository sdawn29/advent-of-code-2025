/**
 * Day 04 - Printing Department Part 1
 *
 * Problem: Count all "@" cells in a grid that have fewer than 4 adjacent "@" neighbors.
 * These represent "edge" or "exposed" cells that aren't fully surrounded.
 *
 * Algorithm:
 * 1. Parse the input file into a 2D character grid
 * 2. For each "@" cell, count how many of its 8 neighbors (orthogonal + diagonal) are also "@"
 * 3. If the count is less than 4, increment the answer
 *
 * Time Complexity: O(rows × cols) - each cell is visited once, with constant work per cell
 * Space Complexity: O(rows × cols) - for storing the grid
 */

// ─────────────────────────────────────────────────────────────────────────────
// INPUT PARSING
// ─────────────────────────────────────────────────────────────────────────────

const inputFile = await Bun.file("./input/day-04.txt").text();
const inputArray = inputFile.split("\n");

// Convert each line into an array of characters to create a 2D grid
const inputGrid = inputArray.map((line) => line.split(""));

// Example grid visualization:
// [.  0.   1.   2.   3.   4.   5.   6.   7.   8.   9
//   [".", ".", "@", "@", ".", "@", "@", "@", "@", "."], 0
//   ["@", "@", "@", ".", "@", ".", "@", ".", "@", "@"], 1
//   ["@", "@", "@", "@", "@", ".", "@", ".", "@", "@"], 2
//   ["@", ".", "@", "@", "@", "@", ".", ".", "@", "."], 3
//   ["@", "@", ".", "@", "@", "@", "@", ".", "@", "@"], 4
//   [".", "@", "@", "@", "@", "@", "@", "@", ".", "@"], 5
//   [".", "@", ".", "@", ".", "@", ".", "@", "@", "@"], 6
//   ["@", ".", "@", "@", "@", ".", "@", "@", "@", "@"], 7
//   [".", "@", "@", "@", "@", "@", "@", "@", "@", "."], 8
//   ["@", ".", "@", ".", "@", "@", "@", ".", "@", "."], 9
// ];

// ─────────────────────────────────────────────────────────────────────────────
// DIRECTION VECTORS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * All 8 possible directions to check for adjacent cells:
 * - Orthogonal: up, down, left, right
 * - Diagonal: top-left, top-right, bottom-left, bottom-right
 *
 * Each pair represents [deltaX, deltaY] offset from current position
 */
const adjacentCord = [
  [-1, 0], // up
  [1, 0], // down
  [0, -1], // left
  [0, 1], // right
  [-1, -1], // top-left (diagonal)
  [-1, 1], // top-right (diagonal)
  [1, -1], // bottom-left (diagonal)
  [1, 1], // bottom-right (diagonal)
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LOGIC
// ─────────────────────────────────────────────────────────────────────────────

const xRows = inputGrid.length;
const yCols = inputGrid[0]?.length ?? 0;

let ans = 0;

// Iterate through every cell in the grid
for (let x = 0; x < xRows; x++) {
  const row = inputGrid[x]!; // Cache current row for faster access

  for (let y = 0; y < yCols; y++) {
    // Skip non-"@" cells - we only care about counting "@" cells
    if (row[y] !== "@") continue;

    // Count adjacent "@" neighbors for this cell
    let adjacentCount = 0;

    for (const [dx, dy] of adjacentCord) {
      const newX = x + dx!;
      const newY = y + dy!;

      // Check bounds and if neighbor is also "@"
      if (
        newX >= 0 &&
        newX < xRows &&
        newY >= 0 &&
        newY < yCols &&
        inputGrid[newX]![newY] === "@"
      ) {
        // Early exit optimization: once we have 4+ neighbors,
        // this cell won't be counted anyway, so stop checking
        if (++adjacentCount >= 4) break;
      }
    }

    // Only count cells with fewer than 4 adjacent "@" neighbors
    // These are "exposed" cells that aren't fully surrounded
    if (adjacentCount < 4) ans++;
  }
}

console.log("Day 04 - Printing Department Part 1:", ans);
