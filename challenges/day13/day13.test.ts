import path from 'path';
import fs from 'fs';
import { describe, test, expect } from 'vitest';

import solvePart1, { compare as compare1 } from './part1';
import solvePart2 from './part2';

const input = fs.readFileSync(path.resolve(__dirname, './test_inputs/1.txt'), { encoding: 'utf-8' });

describe('part 1', () => {

  test('first pair', () => {
    const pair = input.split('\n\n')[0].split('\n') as [string, string];
    expect(compare1(pair)).toBe(true);
  });

  test('second pair', () => {
    const pair = input.split('\n\n')[1].split('\n') as [string, string];
    expect(compare1(pair)).toBe(true);
  });

  test('third pair', () => {
    const pair = input.split('\n\n')[2].split('\n') as [string, string];
    expect(compare1(pair)).toBe(false);
  });

  test('fourth pair', () => {
    const pair = input.split('\n\n')[3].split('\n') as [string, string];
    expect(compare1(pair)).toBe(true);
  });

  test('fifth pair', () => {
    const pair = input.split('\n\n')[4].split('\n') as [string, string];
    expect(compare1(pair)).toBe(false);
  });

  test('sixth pair', () => {
    const pair = input.split('\n\n')[5].split('\n') as [string, string];
    expect(compare1(pair)).toBe(true);
  });

  test('seventh pair', () => {
    const pair = input.split('\n\n')[6].split('\n') as [string, string];
    expect(compare1(pair)).toBe(false);
  });

  test('eighth pair', () => {
    const pair = input.split('\n\n')[7].split('\n') as [string, string];
    expect(compare1(pair)).toBe(false);
  });

  test('solvePart1', () => {
    expect(solvePart1(input)).toBe(13);
  });

});

describe.only('part 2', () => {

  test('solvePart2', () => {
    expect(solvePart2(input)).toBe(140);
  });

});