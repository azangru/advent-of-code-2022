import { describe, test, expect } from 'vitest'

import * as helpers from './helpers';

import solvePart1 from "./part1";
import solvePart2 from './part2';


const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

describe('helpers', () => {

  test('splitLine', () => {
    expect(helpers.splitLine('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual([
      'vJrwpWtwJgWr',
      'hcsFMMfFFhFp'
    ]);
  });

  test('findRepeatedLetters', () => {
    const {splitLine, findDuplicates} = helpers;
    const checkDuplicates = (input: string) =>
      [...findDuplicates(splitLine(input)).duplicatesBetweenStrings.values()]

    expect(checkDuplicates('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual(['p']);
    expect(checkDuplicates('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL')).toEqual(['L']);
    expect(checkDuplicates('PmmdzqPrVvPwwTWBwg')).toEqual(['P']);
    expect(checkDuplicates('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn')).toEqual(['v']);
    expect(checkDuplicates('ttgJtRGJQctTZtZT')).toEqual(['t']);
    expect(checkDuplicates('CrZsJsPPZsGzwwsLwLmpwMDw')).toEqual(['s']);
  });

  test('getLetterCode', () => {
    const { getLetterCode } = helpers;

    expect(getLetterCode('p')).toBe(16);
    expect(getLetterCode('L')).toBe(38);
    expect(getLetterCode('P')).toBe(42);
    expect(getLetterCode('v')).toBe(22);
    expect(getLetterCode('t')).toBe(20);
    expect(getLetterCode('s')).toBe(19);
  });

});

describe('part 1', () => {

  test('solvePart1', () => {
    expect(solvePart1(input)).toBe(157);
  });

});

describe('part 2', () => {

  test('solvePart2', () => {
    expect(solvePart2(input)).toBe(70);
  });

});