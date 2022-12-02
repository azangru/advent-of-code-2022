import { describe, it, expect } from 'vitest'

import solvePart1 from "./part1";

const input = `
A Y
B X
C Z
`.trim();


describe('day 2', () => {

  describe('part 1', () => {

    it('gets correct score', () => {
      console.log(solvePart1('C Z'));
      expect(solvePart1('A Y')).toBe(8);
      expect(solvePart1('B X')).toBe(1);
      expect(solvePart1('C Z')).toBe(6);

      expect(solvePart1(input)).toBe(15);
    });

  });


  // describe('part 2', () => {

  //   it('finds the sum of numbers of the three largest group', () => {
  //     expect(solvePart2(input)).toBe(45000);
  //   });

  // });
  
});