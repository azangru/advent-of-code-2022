import parseInput, { findStartAndEnd } from "./parseInput";

const main = (input: string) => {
  const grid = parseInput(input);
  const { startPosition} = findStartAndEnd(grid);
  const breadthFirstSearch = new BreadthFirstSearch(grid, startPosition);
  const stepCount = breadthFirstSearch.search();
  return stepCount;
};

class Node {
  constructor(
    public value: string,
    public coordinates: [number, number],
    public step: number,
  ) {}
};

export class BreadthFirstSearch {

  maze: string[][];
  queue: Node[] = [];
  visited: Set<string> = new Set();

  constructor(maze: string[][], startCoordinates: [number, number]) {
    this.maze = maze;
    const [rowIndex, columnIndex] = startCoordinates;
    const startNode = new Node(
      maze[rowIndex][columnIndex],
      startCoordinates,
      1
    );
    this.queue.push(startNode);
    this.visited.add(`${rowIndex}, ${columnIndex}`);
  }

  search() {
    while (this.queue.length) {
      const steps = this.examineNeighboringNodes();
      if (steps) {
        return steps;
      }
    }
  }

  examineNeighboringNodes() {
    const currentNode = this.queue.shift() as Node;
    const [rowIndex, columnIndex] = currentNode.coordinates;
    const candidateCoordinates = [
      [rowIndex - 1, columnIndex], // up
      [rowIndex + 1, columnIndex], // down
      [rowIndex, columnIndex - 1], // left
      [rowIndex, columnIndex + 1] // right
    ] as [number, number][];

    const filteredCandidateCoordinates = candidateCoordinates
      .filter(([rowIndex, columnIndex]) => {
        const value = this.maze[rowIndex]?.[columnIndex];
        if (currentNode.value === 'S') {
          return value === 'a';
        } else if (value === 'E') {
          return currentNode.value === 'z';
        } else {
          return value
            && value.charCodeAt(0) - currentNode.value.charCodeAt(0) <= 1
            && !this.visited.has(`${rowIndex}, ${columnIndex}`);
        }
      });

    if (currentNode.value === 'z' && filteredCandidateCoordinates.find(([rowIndex, columnIndex]) => {
      return this.maze[rowIndex][columnIndex] === 'E'
    })) {
      return currentNode.step;
    }

    filteredCandidateCoordinates.forEach(([rowIndex, columnIndex]) => {
      const node = new Node(
        this.maze[rowIndex][columnIndex],
        [rowIndex, columnIndex],
        currentNode.step + 1
      );
      this.queue.push(node);
      this.visited.add(`${rowIndex}, ${columnIndex}`);
    });
  }

}

export default main;