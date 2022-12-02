import { describe, it, expect } from 'vitest'

import solvePart1 from './part1';
import solvePart2 from './part2';

const input = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`.trim();


describe('day 1', () => {

  describe('part 1', () => {

    it('finds the sum of numbers in the largest group', () => {
      expect(solvePart1(input)).toBe(24000);
    });

  });


  describe('part 2', () => {

    it('finds the sum of numbers of the three largest group', () => {
      expect(solvePart2(input)).toBe(45000);
    });

  });
  
});