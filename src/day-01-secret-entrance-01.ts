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

let password = 0;
let pos = 50;

inputArray.forEach((item) => {
  let direction = item.slice(0, 1);
  let distance = parseInt(item.slice(1));

  pos = (pos + ((direction === "L" ? -distance : distance) % 100) + 100) % 100;

  if (pos === 0) {
    password++;
  }
});

console.log("Day 01 - Secret Entrance: ", password);
