/**
 * Day 05 - Cafeteria - Part 01
 *
 * Problem: Count how many item IDs fall within at least one valid range.
 * Input consists of two sections separated by blank line:
 * - Section 1: Valid ranges in "start-end" format (inclusive)
 * - Section 2: Item IDs to check
 *
 * Solution: For each item ID, check if it falls within any valid range.
 * Once a match is found, count it and move to the next item.
 *
 * Time Complexity: O(m * n) where m = item IDs, n = ranges
 * Space Complexity: O(m + n) for storing parsed input
 */

const inputFile = await Bun.file("./input/day-05.txt").text();
const inputArray = inputFile.split("\n\n");

const validRange = inputArray[0]!.split("\n");
const itemIds = inputArray[1]!.split("\n");

let ans = 0;

itemIds.forEach((itemId) => {
  for (const range of validRange) {
    const rangeArray = range.split("-");
    const start = Number(rangeArray[0]!);
    const end = Number(rangeArray[1]!);
    if (Number(itemId) >= start && Number(itemId) <= end) {
      ans++;
      console.log(range, itemId, "valid");
      break;
    }
  }
});

console.log("Day 05 - Cafetaria - Part 01:", ans);
