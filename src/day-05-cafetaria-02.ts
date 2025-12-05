/**
 * Day 05 - Cafeteria - Part 02
 *
 * Problem: Count the total number of unique integers covered by a list of ranges.
 * Each range is specified as "start-end" (inclusive).
 *
 * Solution: Parse into Set (dedupes), sort, merge overlapping ranges, sum lengths.
 *
 * Time Complexity: O(n log n) | Space Complexity: O(n)
 */

type Range = [start: number, end: number];

const inputFile = await Bun.file("./input/day-05.txt").text();

const ranges: Range[] = Array.from(
  new Set(inputFile.split("\n\n")[0]!.split("\n"))
)
  .map((line) => line.split("-").map(Number) as Range)
  .sort((a, b) => a[0] - b[0]);

const merged = ranges.reduce<Range[]>((acc, curr) => {
  const last = acc[acc.length - 1];
  if (last && curr[0] <= last[1] + 1) {
    last[1] = Math.max(last[1], curr[1]);
    return acc;
  }
  return acc.concat([curr]);
}, []);

const uniqueCount = merged.reduce(
  (sum, [start, end]) => sum + (end - start + 1),
  0
);

console.log("Day 05 - Cafetaria - Part 02:", uniqueCount);
