import { describe, test, expect } from 'vitest';

import solvePart1 from './part1';
import solvePart2, { chase } from './part2';

const input = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

const input2 = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;

describe('part 1', () => {

  test('solvePart1', () => {
    expect(solvePart1(input)).toBe(13);
  });

});


describe('part 2', () => {

  test('solvePart2', () => {
    expect(solvePart2(input)).toBe(1);
  });

  test.only('solvePart2 on larger area', () => {
    expect(solvePart2(input2)).toBe(36);
  });

});