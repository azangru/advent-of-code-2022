import { describe, test, expect } from 'vitest';

import solvePart1, { Puzzle as Puzzle1  } from './part1';

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