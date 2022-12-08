import parseInput from './parseInput';

const main = (input: string) => {
  const grid = parseInput(input);

  return getHighestScenicScore(grid);
};

const getHighestScenicScore = (grid: number[][]) => {
  const trees: {
    height: number;
    coordinates: { row: number, column: number };
    treesLeft: number;
    treesRight: number;
    treesTop: number;
    treesBottom: number;
  }[] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      const treeData = {
        height: grid[row][column],
        coordinates: { row, column },
        treesLeft: getVisibleTreesLeft(grid, [row, column]),
        treesRight: getVisibleTreesRight(grid, [row, column]),
        treesTop: getVisibleTreesTop(grid, [row, column]),
        treesBottom: getVisibleTreesBottom(grid, [row, column])
      }

      trees.push(treeData);
    }
  }

  return trees.reduce((acc, tree) => {
    const { treesLeft, treesRight, treesTop, treesBottom } = tree;
    const score = treesLeft * treesRight * treesTop * treesBottom;
    return Math.max(acc, score);
  }, 0);
};

const getVisibleTreesLeft = (grid: number[][], currentCoords: number[]) => {
  const [rowIndex, columnIndex] = currentCoords;

  if (columnIndex === 0) {
    return 0;
  }

  const row = grid[rowIndex];
  
  let count = 0;

  for (let cellIndex = columnIndex - 1; cellIndex >= 0; cellIndex--) {
    if (row[cellIndex] < row[columnIndex]) {
      count++;
    } else {
      count++;
      break;
    }
  }

  return count;
};

const getVisibleTreesRight = (grid: number[][], currentCoords: number[]) => {
  const [rowIndex, columnIndex] = currentCoords;
  const row = grid[rowIndex];

  if (columnIndex === row.length - 1) {
    return 0;
  }
  
  let count = 0;

  for (let cellIndex = columnIndex + 1; cellIndex <= row.length - 1; cellIndex++) {
    if (row[cellIndex] < row[columnIndex]) {
      count++;
    } else {
      count++;
      break;
    }
  }

  return count;
};

const getVisibleTreesTop = (grid: number[][], currentCoords: number[]) => {
  const [rowIndex, columnIndex] = currentCoords;

  if (rowIndex === 0) {
    return 0;
  }

  let count = 0;

  for(let ri = rowIndex - 1; ri >= 0; ri--) {
    if (grid[ri][columnIndex] < grid[rowIndex][columnIndex]) {
      count++;
    } else {
      count++;
      break;
    }
  }

  return count;
};

const getVisibleTreesBottom = (grid: number[][], currentCoords: number[]) => {
  const [rowIndex, columnIndex] = currentCoords;

  if (rowIndex === grid.length - 1) {
    return 0;
  }

  let count = 0;

  for(let ri = rowIndex + 1; ri < grid.length; ri++) {
    if (grid[ri][columnIndex] < grid[rowIndex][columnIndex]) {
      count++;
    } else {
      count ++;
      break;
    }
  }

  return count;
};

export default main;