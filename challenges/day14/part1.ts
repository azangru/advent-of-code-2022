import parseInput from "./parseInput";

const main = (input: string) => {
  const puzzle = new Puzzle(input);
  puzzle.fillWithSand();
  return puzzle.countGrainsOfSand();
};

export class Puzzle {

  wallXMin = 0;
  wallXMax = 0;
  wallYMax = 0;
  grid: Array<string|undefined>[];

  constructor(input: string) {
    const parsedInput = parseInput(input);
    this.grid = this.buildGrid(parsedInput);
  }

  private buildGrid(wallCoordinates: number[][][]) {
    const { xMin, xMax, yMax } = this.findMinAndMaxWallCoords(wallCoordinates);
    this.wallXMin = xMin;
    this.wallXMax = xMax;
    this.wallYMax = yMax;

    const emptyGrid = [...Array(yMax + 1)]
      .map(() => Array(xMax + 1).fill(undefined));

    return this.fillGridWithWalls(emptyGrid, wallCoordinates);
  }

  private findMinAndMaxWallCoords(wallCoordinates: number[][][]) {
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMax = -Infinity;

    for (const group of wallCoordinates) {
      for (const pair of group) {
        const [x, y] = pair;
        if (x < xMin) {
          xMin = x;
        }
        if (x > xMax) {
          xMax = x;
        }
        if (y > yMax) {
          yMax = y;
        }
      }
    }

    return {
      xMin,
      xMax,
      yMin: 0,
      yMax
    };
  }

  private fillGridWithWalls(grid: Array<string | undefined>[], wallCoordinates: number[][][]) {
    for (const group of wallCoordinates) {
      for (let i = 0; i < group.length; i++) {
        if (i === group.length - 1) {
          continue;
        }
        const pair1 = group[i];
        const pair2 = group[i+1];
        if (pair1[0] === pair2[0]) {
          buildVerticalPartition(pair1 as [number, number], pair2 as [number, number], grid);
        } else if (pair1[1] === pair2[1]) {
          // this should be the only other option; but being careful
          buildHorizontalPartition(pair1 as [number, number], pair2 as [number, number], grid);
        }
      }
    }

    return grid;
  }

  // for debugging
  printGrid() {
    const { grid, wallXMin } = this;
    let output = '';
    let line = '';
    for (const row of grid) {
      line = '';
      for (let i = wallXMin; i < row.length; i++) {
        const symbol = row[i] ?? '.';
        line += symbol;
      }
      output += line += '\n';
    }

    console.log(output);
  }

  fillWithSand() {
    const sandEntryCoords: [number, number] = [500, 0];
    
    let continueFilling = true;

    while (continueFilling) {
      const newCoords = this.trackSandGrain();
      if (!newCoords || newCoords && areEqualCoords(newCoords, sandEntryCoords)) {
        continueFilling = false;
      }
    }
  }

  trackSandGrain() {
    let currentCoords: [number, number] = [500, 0];
    let newCoords: [number, number] = [0,0];

    let continueFall = true;

    while(continueFall) {
      newCoords = this.getNextGrainOfSandCoordinates(currentCoords);
      if (areEqualCoords(currentCoords, newCoords) || newCoords[1] >= this.wallYMax) {
        continueFall = false;
      }
      currentCoords = newCoords;
    }

    if (newCoords[1] >= this.wallYMax) {
      return false;
    }

    this.grid[newCoords[1]][newCoords[0]] = 'o';
    return newCoords;
  }

  getNextGrainOfSandCoordinates(currentCoordinates: [number, number]): [number, number] {
    const [x, y] = currentCoordinates;
    if (!this.grid[y + 1][x]) {
      return [x, y + 1];
    } else if (!this.grid[y + 1][x - 1]) {
      return [x - 1, y + 1];
    } else if (!this.grid[y + 1][x + 1]) {
      return [x + 1, y + 1];
    }
    return currentCoordinates;
  }

  countGrainsOfSand() {
    let count = 0;

    for (const row of this.grid) {
      for (const cell of row) {
        if (cell === 'o') {
          count++
        }
      }
    }

    return count;
  }

}

const buildHorizontalPartition = (coords1: [number, number], coords2: [number, number], grid: Array<string | undefined>[]) => {
  const [x1, y] = coords1;
  const [x2] = coords2;
  const xFrom = Math.min(x1, x2);
  const xTo = Math.max(x1, x2);
  
  for (let i = xFrom; i <= xTo; i++) {
    grid[y][i] = '#';
  }
};

const buildVerticalPartition = (coords1: [number, number], coords2: [number, number], grid: Array<string | undefined>[]) => {
  const [x, y1] = coords1;
  const [, y2] = coords2;
  const yFrom = Math.min(y1, y2);
  const yTo = Math.max(y1, y2);
 
  for (let i = yFrom; i <= yTo; i++) {
    grid[i][x] = '#';
  }
};

const areEqualCoords = (coords1: [number, number], coords2: [number, number]) => {
  return coords1[0] === coords2[0] && coords1[1] === coords2[1];
}


export default main;