import { describe, test, expect } from 'vitest';

import solvePart1, { Puzzle as Puzzle1  } from './part1';
import solvePart2, { Puzzle as Puzzle2  } from './part2';

const input = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`;

describe('part 1', () => {

  test('fillWithSand', () => {
    const puzzle = new Puzzle1(input);
    puzzle.fillWithSand();
    puzzle.printGrid();
  });

  test('solvePart1', () => {
    expect(solvePart1(input)).toBe(24);
  });

});

describe('part 2', () => {

  test('fillWithSand', () => {
    const puzzle = new Puzzle2(input);
    puzzle.fillWithSand();
    puzzle.printGrid();
  });

  test('solvePart2', () => {
    expect(solvePart2(input)).toBe(93);
  });

});