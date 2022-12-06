import { describe, test, expect } from 'vitest';

import solvePart1 from './part1';
import solvePart2 from './part2';

const input1 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
const input2 = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
const input3 = 'nppdvjthqldpwncqszvftbrmjlhg';
const input4 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
const input5 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';

describe('part 1', () => {

  test('solvePart1', () => {
    expect(solvePart1(input1)).toBe(7);
    expect(solvePart1(input2)).toBe(5);
    expect(solvePart1(input3)).toBe(6);
    expect(solvePart1(input4)).toBe(10);
    expect(solvePart1(input5)).toBe(11);
  });

});

describe('part 2', () => {

  test('solvePart2', () => {
    expect(solvePart2(input1)).toBe(19);
    expect(solvePart2(input2)).toBe(23);
    expect(solvePart2(input3)).toBe(23);
    expect(solvePart2(input4)).toBe(29);
    expect(solvePart2(input5)).toBe(26);
  });

});