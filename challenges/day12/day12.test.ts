import { describe, test, expect } from 'vitest';


import solvePart1 from './part1';

const input = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

describe('part 1', () => {

  test('something', () => {
    expect(solvePart1(input)).toBe(31);
  });

});