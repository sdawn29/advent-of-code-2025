const inputFile = await Bun.file("./input/day-06.txt").text();

function solveWorksheet(input: string): number {
  const lines = input.trim().split("\n");
  
  // Find the maximum line length
  const maxLen = Math.max(...lines.map(line => line.length));
  
  // Pad all lines to the same length
  const paddedLines = lines.map(line => line.padEnd(maxLen, ' '));
  
  // Group characters by column position
  const columns: string[] = [];
  for (let col = 0; col < maxLen; col++) {
    let colStr = '';
    for (let row = 0; row < paddedLines.length; row++) {
      const char = paddedLines[row]?.[col];
      colStr += char || ' ';
    }
    columns.push(colStr);
  }
  
  // Find problems - a problem is a sequence of non-space columns
  // separated by all-space columns
  const problems: string[][] = [];
  let currentProblem: string[] = [];
  
  for (const col of columns) {
    const isAllSpaces = col.split('').every(c => c === ' ');
    
    if (isAllSpaces) {
      if (currentProblem.length > 0) {
        problems.push(currentProblem);
        currentProblem = [];
      }
    } else {
      currentProblem.push(col);
    }
  }
  
  if (currentProblem.length > 0) {
    problems.push(currentProblem);
  }
  
  let grandTotal = 0;
  
  // Process each problem
  for (const problem of problems) {
    // Reconstruct rows from the columns
    const rows: string[] = [];
    for (let row = 0; row < paddedLines.length; row++) {
      let rowStr = '';
      for (const col of problem) {
        const char = col[row];
        rowStr += char || ' ';
      }
      rows.push(rowStr.trim());
    }
    
    // Filter out empty rows
    const cleanRows = rows.filter(r => r.length > 0);
    
    if (cleanRows.length === 0) continue;
    
    // Last row is the operation
    const operation = cleanRows[cleanRows.length - 1];
    const numberStrs = cleanRows.slice(0, -1);
    const numbers = numberStrs.map(n => parseInt(n, 10));
    
    if (numbers.length === 0 || numbers[0] === undefined) continue;
    
    // Calculate result
    let result = numbers[0];
    if (operation === '+') {
      for (let i = 1; i < numbers.length; i++) {
        const num = numbers[i];
        if (num !== undefined) {
          result += num;
        }
      }
    } else if (operation === '*') {
      for (let i = 1; i < numbers.length; i++) {
        const num = numbers[i];
        if (num !== undefined) {
          result *= num;
        }
      }
    }
    
    grandTotal += result;
  }
  
  return grandTotal;
}

// Test with example
const exampleInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   + `;

console.log("Example result:", solveWorksheet(exampleInput), "(expected: 4277556)");

// Solve actual input
console.log("Part 1 answer:", solveWorksheet(inputFile));
