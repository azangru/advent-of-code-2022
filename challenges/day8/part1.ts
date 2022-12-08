import parseInput from './parseInput';

const main = (input: string) => {
  const grid = parseInput(input);

  return getVisibleTrees(grid);
};

const getVisibleTrees = (grid: number[][]) => {
  const trees: {
    height: number;
    coordinates: { row: number, column: number };
    isVisibleFromLeft: boolean;
    isVisibleFromRight: boolean;
    isVisibleFromTop: boolean;
    isVisibleFromBottom: boolean;
  }[] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      const treeData = {
        height: grid[row][column],
        coordinates: { row, column },
        isVisibleFromLeft: isVisibleFromLeft(grid, [row, column]),
        isVisibleFromRight: isVisibleFromRight(grid, [row, column]),
        isVisibleFromTop: isVisibleFromTop(grid, [row, column]),
        isVisibleFromBottom: isVisibleFromBottom(grid, [row, column])
      }

      trees.push(treeData);
    }
  }

  return trees.filter(tree => {
    return tree.isVisibleFromLeft
      || tree.isVisibleFromRight
      || tree.isVisibleFromTop
      || tree.isVisibleFromBottom
  }).length;
};

const isVisibleFromLeft = (grid: number[][], currentCoords: number[]) => {
  const [rowIndex, columnIndex] = currentCoords;

  if (columnIndex === 0) {
    return true;
  }

  const row = grid[rowIndex];
  
  for (let cellIndex = columnIndex - 1; cellIndex >= 0; cellIndex--) {
    if (row[cellIndex] >= row[columnIndex]) {
      return false;
    }
  }

  return true;
};

const isVisibleFromRight = (grid: number[][], currentCoords: number[]) => {
  const [rowIndex, columnIndex] = currentCoords;
  const row = grid[rowIndex];

  if (columnIndex === row.length - 1) {
    return true;
  }
  
  for (let cellIndex = columnIndex + 1; cellIndex <= row.length - 1; cellIndex++) {
    if (row[cellIndex] >= row[columnIndex]) {
      return false;
    }
  }

  return true;
};

const isVisibleFromTop = (grid: number[][], currentCoords: number[]) => {
  const [rowIndex, columnIndex] = currentCoords;

  if (rowIndex === 0) {
    return true;
  }

  for(let ri = rowIndex - 1; ri >= 0; ri--) {
    if (grid[ri][columnIndex] >= grid[rowIndex][columnIndex]) {
      return false;
    }
  }

  return true;
};

const isVisibleFromBottom = (grid: number[][], currentCoords: number[]) => {
  const [rowIndex, columnIndex] = currentCoords;

  if (rowIndex === grid.length - 1) {
    return true;
  }

  for(let ri = rowIndex + 1; ri < grid.length; ri++) {
    if (grid[ri][columnIndex] >= grid[rowIndex][columnIndex]) {
      return false;
    }
  }

  return true;
};

export default main;