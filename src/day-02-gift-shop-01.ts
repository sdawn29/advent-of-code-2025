const path = "./input/day-02.txt";
const file = Bun.file(path);

const inputFile = await file.text();
const inputArray = inputFile.split(",");

let ans = 0;

inputArray.forEach((item) => {
  const parts = item.split("-");
  const start = parseInt(parts[0] ?? "");
  const end = parseInt(parts[1] ?? "");

  for (let i = start; i <= end; i++) {
    const divisor = 10 ** (i.toString().length / 2);
    const firstHalf = Math.floor(i / divisor);
    const secondHalf = i % divisor;

    if (firstHalf === secondHalf) {
      console.log(`${start}-${end}: ${i}`);
      ans += i;
    }
  }
});

console.log("Day 02 - Gift Shop: ", ans);
