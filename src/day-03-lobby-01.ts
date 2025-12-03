const inputFile = await Bun.file("./input/day-03.txt").text();
const inputArray = inputFile.split("\n");

const ans = inputArray.reduce((total, item) => {
  const digits = item.split("").map(Number);

  // Find the largest digit that isn't the last one
  let firstIndex = 0;
  for (let i = 1; i < digits.length - 1; i++) {
    if (digits[i]! > digits[firstIndex]!) {
      firstIndex = i;
    }
  }
  const first = digits[firstIndex]!;

  // Find the largest digit after firstIndex
  const second = Math.max(...digits.slice(firstIndex + 1));

  const jolts = first * 10 + second;
  console.log(item, jolts);

  return total + jolts;
}, 0);

console.log("Day 03 - Lobby: ", ans);
