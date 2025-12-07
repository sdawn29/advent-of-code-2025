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
  
  // Process each problem - RIGHT-TO-LEFT
  // In cephalopod math, we read columns from right to left
  // Each column (read top-to-bottom) forms one number
  // The operator is in the last row
  for (const problem of problems) {
    const numRows = paddedLines.length;
    const operatorRow = numRows - 1;
    
    // Collect values for each column (reading right to left)
    const numberColumns: string[] = [];
    let operation = '';
    
    // Process columns from right to left
    for (let colIdx = problem.length - 1; colIdx >= 0; colIdx--) {
      const col = problem[colIdx];
      if (!col) continue;
      
      // Build value from this column (excluding the operator row)
      let numberValue = '';
      for (let row = 0; row < operatorRow; row++) {
        const char = col[row];
        if (char) {
          numberValue += char;
        }
      }
      
      numberValue = numberValue.trim();
      if (numberValue.length > 0) {
        numberColumns.push(numberValue);
      }
      
      // Check if this column has the operator
      const opChar = col[operatorRow];
      if (opChar && (opChar === '+' || opChar === '*')) {
        operation = opChar;
      }
    }
    
    if (numberColumns.length === 0 || !operation) continue;
    
    const numbers = numberColumns.map(n => parseInt(n, 10)).filter(n => !isNaN(n));
    
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

console.log("Example result:", solveWorksheet(exampleInput), "(expected: 3263827)");

// Solve actual input
console.log("Part 2 answer:", solveWorksheet(inputFile));
