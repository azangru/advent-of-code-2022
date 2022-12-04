import { describe, test, expect } from 'vitest'

import solvePart1 from "./part1";
import solvePart2 from './part2';


const input = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

describe('part 1', () => {

  test('solvePart1', () => {
    expect(solvePart1(input)).toBe(2);
  });

});

describe('part 2', () => {

  test('solvePart2', () => {
    expect(solvePart2(input)).toBe(4);
  });

});