import { describe, test, expect } from 'vitest';

import solvePart1 from './part1';
import solvePart2 from './part2';

const input = `
30373
25512
65332
33549
35390
`;

describe('part 1', () => {

  test('solvePart1', () => {
    expect(solvePart1(input)).toBe(21);
  });

});

describe('part 2', () => {

  test('solvePart2', () => {
    expect(solvePart2(input)).toBe(8);
  });

});