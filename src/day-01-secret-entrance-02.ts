const path = "./input/day-01.txt";
const file = Bun.file(path);

const inputFile = await file.text();

const inputArray = inputFile.split("\n");

// const inputArray = [
//   "L68",
//   "L30",
//   "R48",
//   "L5",
//   "R60",
//   "L55",
//   "L1",
//   "L99",
//   "R14",
//   "L82",
// ];

// const inputArray = ["R1000"];

let password = 0;
let pos = 50;

inputArray.forEach((item) => {
  const direction = item.slice(0, 1);
  const distance = parseInt(item.slice(1));

  const start = pos;
  const end = pos + (direction === "L" ? -distance : distance);

  // Count how many times we cross or land on 0
  // We want to count multiples of 100 in the half-open interval (start, end] or [end, start)
  // i.e., exclude the starting position, include the ending position
  let crossings: number;
  if (direction === "L") {
    // Moving left: count multiples of 100 in [end, start) - include end, exclude start
    crossings = Math.ceil(start / 100) - Math.ceil(end / 100);
  } else {
    // Moving right: count multiples of 100 in (start, end] - exclude start, include end
    crossings = Math.floor(end / 100) - Math.floor(start / 100);
  }

  password += crossings;

  pos = ((end % 100) + 100) % 100;
  console.log(item, pos, `(+${crossings} crossings)`);
});

console.log("Day 01 - Secret Entrance: ", password);
