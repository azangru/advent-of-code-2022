import { describe, test, expect } from 'vitest'

import solvePart1 from './part1';

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
  test('solvePart1', () => {
    expect(solvePart1(input)).toBe(24000);
  })
})