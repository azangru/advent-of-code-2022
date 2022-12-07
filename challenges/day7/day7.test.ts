import { describe, test, expect } from 'vitest';

import solvePart1 from './part1';
import solvePart2 from './part2';

const input = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`.trim();


describe('part 1', () => {

  test('solvePart1', () => {
    expect(solvePart1(input)).toBe(95437);
  });

});

describe('part 2', () => {

  test('solvePart2', () => {
    expect(solvePart2(input)).toBe(24933642);
  });

});