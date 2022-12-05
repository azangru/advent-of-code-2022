import { describe, test, expect } from 'vitest';

import solvePart1 from './part1';
import solvePart2 from './part2';

const input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

describe('part 1', () => {

  test('solvePart1', () => {
    expect(solvePart1(input)).toBe('CMZ');
  });

});

describe('part 2', () => {

  test('solvePart2', () => {
    expect(solvePart2(input)).toBe('MCD');
  });

});