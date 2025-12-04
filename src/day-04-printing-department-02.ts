/**
 * Day 04 - Printing Department Part 2
 *
 * Problem: Iteratively remove all "exposed" "@" cells from a grid until no more
 * can be removed. An exposed cell is one with fewer than 4 adjacent "@" neighbors.
 * Count the total number of cells removed across all iterations.
 *
 * Algorithm:
 * 1. Parse the input file into a 2D character grid
 * 2. Recursively process the grid:
 *    a. For each "@" cell, count its 8 neighbors (orthogonal + diagonal)
 *    b. If count < 4, mark as removed (change to ".") and increment counter
 *    c. If count >= 4, keep the cell as "@"
 * 3. Repeat until no cells are removed in an iteration (base case)
 * 4. Return the total count of removed cells
 *
 * This simulates an "erosion" effect where outer layers of "@" cells are
 * progressively stripped away until only densely-packed clusters remain.
 *
 * Time Complexity: O(k × rows × cols) where k is the number of iterations
 * Space Complexity: O(rows × cols) - for storing the grid
 */

// ─────────────────────────────────────────────────────────────────────────────
// INPUT PARSING
// ─────────────────────────────────────────────────────────────────────────────

const inputFile = await Bun.file("./input/day-04.txt").text();
const inputArray = inputFile.split("\n");

// Convert each line into an array of characters to create a 2D grid
const inputGrid = inputArray.map((line) => line.split(""));

let newGrid: string[][] = [];

// Example grid visualization:
// const inputGrid = [
//   [".", ".", "@", "@", ".", "@", "@", "@", "@", "."],
//   ["@", "@", "@", ".", "@", ".", "@", ".", "@", "@"],
//   ["@", "@", "@", "@", "@", ".", "@", ".", "@", "@"],
//   ["@", ".", "@", "@", "@", "@", ".", ".", "@", "."],
//   ["@", "@", ".", "@", "@", "@", "@", ".", "@", "@"],
//   [".", "@", "@", "@", "@", "@", "@", "@", ".", "@"],
//   [".", "@", ".", "@", ".", "@", ".", "@", "@", "@"],
//   ["@", ".", "@", "@", "@", ".", "@", "@", "@", "@"],
//   [".", "@", "@", "@", "@", "@", "@", "@", "@", "."],
//   ["@", ".", "@", ".", "@", "@", "@", ".", "@", "."],
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

/** Running total of all removed cells across all iterations */
let ans = 0;

/**
 * Recursively removes exposed "@" cells from the grid.
 *
 * An exposed cell is one with fewer than 4 adjacent "@" neighbors.
 * The function continues recursively until no more cells can be removed.
 *
 * @param grid - The current state of the 2D character grid
 * @returns The final grid state after all exposed cells are removed
 *
 * @example
 * // Initial grid with some exposed cells:
 * // ["@", "@", "."]
 * // ["@", "@", "@"]
 * // After processing, corner cells with < 4 neighbors are removed
 */
function removeRolls(grid: string[][]): string[][] {
  const xRows = grid.length;
  const yCols = grid[0]?.length ?? 0;
  let newGrid: string[][] = [];

  /** Number of cells removed in this iteration - used for termination check */
  let removedCount = 0;

  for (let x = 0; x < xRows; x++) {
    const row = grid[x]!; // Cache current row for faster access

    for (let y = 0; y < yCols; y++) {
      // Skip non-"@" cells - we only care about counting "@" cells
      if (row[y] !== "@") {
        newGrid[x] = newGrid[x] || [];
        newGrid[x]![y] = ".";
        continue;
      }

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
          grid[newX]![newY] === "@"
        ) {
          // Early exit optimization: once we have 4+ neighbors,
          // this cell won't be counted anyway, so stop checking
          if (++adjacentCount >= 4) {
            newGrid[x] = newGrid[x] || [];
            newGrid[x]![y] = "@";
            break;
          }
        }
      }

      // Only count cells with fewer than 4 adjacent "@" neighbors
      // These are "exposed" cells that aren't fully surrounded
      if (adjacentCount < 4) {
        newGrid[x] = newGrid[x] || [];
        newGrid[x]![y] = ".";
        removedCount++;
        ans++;
      }
    }
  }

  // BASE CASE: If nothing was removed, we're done - grid has stabilized
  if (removedCount === 0) {
    return newGrid;
  }

  // RECURSIVE CASE: Continue processing until no more cells can be removed
  return removeRolls(newGrid);
}

// ─────────────────────────────────────────────────────────────────────────────
// EXECUTION
// ─────────────────────────────────────────────────────────────────────────────

// Process the grid recursively until stable
newGrid = removeRolls(inputGrid);

// Output the final grid state and total removed count
console.log(newGrid.map((row) => row.join("")).join("\n"));
console.log("Day 04 - Printing Department Part 2:", ans);
