const path = "./input/day-02.txt";
const file = Bun.file(path);

const inputFile = await file.text();
const inputArray = inputFile.split(",");

// Check if a number is made of a repeated sequence of digits
function isRepeatedPattern(num: number): boolean {
  const str = num.toString();
  const len = str.length;

  // Try all possible pattern lengths from 1 to len/2
  // Pattern must repeat at least twice, so max pattern length is len/2
  for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
    // The pattern length must divide the total length evenly
    if (len % patternLen !== 0) continue;

    const pattern = str.substring(0, patternLen);
    const repeatCount = len / patternLen;

    // Check if the entire string is made of this pattern repeated
    if (pattern.repeat(repeatCount) === str) {
      return true;
    }
  }

  return false;
}

let ans = 0;

inputArray.forEach((item) => {
  const parts = item.split("-");
  const start = parseInt(parts[0] ?? "");
  const end = parseInt(parts[1] ?? "");

  for (let i = start; i <= end; i++) {
    if (isRepeatedPattern(i)) {
      console.log(`${start}-${end}: ${i}`);
      ans += i;
    }
  }
});

console.log("Day 02 - Gift Shop (Part 2): ", ans);
