import { describe, it, expect } from 'vitest'

import solvePart1 from "./part1";

const input = `
A Y
B X
C Z
`;


describe('day 2', () => {

  describe('part 1', () => {

    it('gets correct score', () => {
      console.log(solvePart1('C Z'));
      expect(solvePart1('A X')).toBe(4); // draw, 3 + 1
      expect(solvePart1('A Y')).toBe(8); // win, 6 + 2
      expect(solvePart1('A Z')).toBe(3); // loss, 0 + 3

      expect(solvePart1('B X')).toBe(1); // loss, 0 + 1
      expect(solvePart1('B Y')).toBe(5); // draw, 3 + 2
      expect(solvePart1('B Z')).toBe(9); // win, 6 + 3

      expect(solvePart1('C X')).toBe(7); // win, 6 + 1 
      expect(solvePart1('C Y')).toBe(2); // loss, 0 + 2
      expect(solvePart1('C Z')).toBe(6); // draw, 3 + 3

      expect(solvePart1(input)).toBe(15);
    });

  });


  // describe('part 2', () => {

  //   it('finds the sum of numbers of the three largest group', () => {
  //     expect(solvePart2(input)).toBe(45000);
  //   });

  // });
  
});