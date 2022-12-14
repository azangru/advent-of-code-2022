import { describe, test, expect } from 'vitest';
import path from 'path';
import fs from 'fs';

import parseInput from './parseInput';
import { Computer } from './part1';

import solvePart1 from './part1';
import solvePart2 from './part2';

const smallInput = fs.readFileSync(path.resolve(__dirname, './test_inputs/1.txt'), { encoding: 'utf-8' });
const inputPart1 = fs.readFileSync(path.resolve(__dirname, './test_inputs/2.txt'), { encoding: 'utf-8' });


describe('part 1', () => {

  test('using small input', () => {
    const program = parseInput(smallInput);
    const computer = new Computer(program);

    computer.tick();
    expect(computer.X).toBe(1);

    computer.tick();
    expect(computer.X).toBe(1);

    computer.tick();
    expect(computer.X).toBe(4);

    computer.tick();
    expect(computer.X).toBe(4);

    computer.tick();
    expect(computer.X).toBe(-1);
  });

  test('using larger input', () => {
    const program = parseInput(inputPart1);
    const computer = new Computer(program);

    expect(computer.getSignalDuringCycle(20)).toBe(420);
    expect(computer.getSignalDuringCycle(60)).toBe(1140);
    expect(computer.getSignalDuringCycle(100)).toBe(1800);
    expect(computer.getSignalDuringCycle(140)).toBe(2940);
    expect(computer.getSignalDuringCycle(180)).toBe(2880);
    expect(computer.getSignalDuringCycle(220)).toBe(3960);
  });

  test('solvePart1', () => {
    expect(solvePart1(inputPart1)).toBe(13140);
  });

});

describe('part 2', () => {

  test('solvePart2', () => {
    console.log(solvePart2(inputPart1));
  });

});