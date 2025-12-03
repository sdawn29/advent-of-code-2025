const inputFile = await Bun.file("./input/day-03.txt").text();
const inputArray = inputFile.split("\n");

const TARGET_DIGITS = 12;

const ans = inputArray.reduce((total, item) => {
  const digits = item.split("").map(Number);

  // Greedily select the largest digits while maintaining order
  // We need to pick 12 digits, so we can skip up to (length - 12) digits
  const selected: number[] = [];
  let start = 0;

  for (let i = 0; i < TARGET_DIGITS; i++) {
    // For each position, find the max digit in the valid range
    // We must leave enough digits for the remaining positions
    const end = digits.length - (TARGET_DIGITS - i - 1);
    let maxIdx = start;
    for (let j = start + 1; j < end; j++) {
      if (digits[j]! > digits[maxIdx]!) {
        maxIdx = j;
      }
    }
    selected.push(digits[maxIdx]!);
    start = maxIdx + 1;
  }

  const jolts = BigInt(selected.join(""));
  console.log(item, jolts.toString());

  return total + jolts;
}, 0n);

console.log("Day 03 - Lobby Part 2:", ans.toString());
