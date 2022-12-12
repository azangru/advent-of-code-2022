import path from 'path';
import fs from 'fs';
import { describe, test, expect } from 'vitest';

import parseInput from './parseInput';
import solvePart1, { Monkey as MonkeyPart1, MonkeyBusiness as MonkeyBusiness1 } from './part1';
import solvePart2, { MonkeyBusiness as MonkeyBusiness2 } from './part2';

const input = fs.readFileSync(path.resolve(__dirname, './test_inputs/1.txt'), { encoding: 'utf-8' });

describe('part 1', () => {

  const getMonkeys = (input: string) => {
    return parseInput(input).map(data => {
      return new MonkeyPart1(
        data.monkeyId,
        data.startItems,
        data.operationFn,
        data.getNextMonkeyId
      );
    });
  };

  test('MonkeyBusiness', () => {
    const monkeys = getMonkeys(input);
    const monkeyBusiness = new MonkeyBusiness1(monkeys);
  
    monkeyBusiness.playRound();
    expect(monkeyBusiness.monkeys[0].items).toEqual([20, 23, 27, 26]);
    expect(monkeyBusiness.monkeys[1].items).toEqual([2080, 25, 167, 207, 401, 1046]);

    monkeyBusiness.playRound();
    expect(monkeyBusiness.monkeys[0].items).toEqual([695, 10, 71, 135, 350]);
    expect(monkeyBusiness.monkeys[1].items).toEqual([43, 49, 58, 55, 362]);

    monkeyBusiness.playRound();
    expect(monkeyBusiness.monkeys[0].items).toEqual([16, 18, 21, 20, 122]);
    expect(monkeyBusiness.monkeys[1].items).toEqual([1468, 22, 150, 286, 739]);

    monkeyBusiness.playRound();
    expect(monkeyBusiness.monkeys[0].items).toEqual([491, 9, 52, 97, 248, 34]);
    expect(monkeyBusiness.monkeys[1].items).toEqual([39, 45, 43, 258]);

    monkeyBusiness.playRound();
    expect(monkeyBusiness.monkeys[0].items).toEqual([15, 17, 16, 88, 1037]);
    expect(monkeyBusiness.monkeys[1].items).toEqual([20, 110, 205, 524, 72]);

    monkeyBusiness.playRound();
    expect(monkeyBusiness.monkeys[0].items).toEqual([8, 70, 176, 26, 34]);
    expect(monkeyBusiness.monkeys[1].items).toEqual([481, 32, 36, 186, 2190]);
  });

  test('after 15 rounds', () => {
    const monkeys = getMonkeys(input);
    const monkeyBusiness = new MonkeyBusiness1(monkeys);
    monkeyBusiness.playRounds(15);

    expect(monkeyBusiness.monkeys[0].items).toEqual([83, 44, 8, 184, 9, 20, 26, 102]);
    expect(monkeyBusiness.monkeys[1].items).toEqual([110, 36]);
  });

  test('after 20 rounds', () => {
    const monkeys = getMonkeys(input);
    const monkeyBusiness = new MonkeyBusiness1(monkeys);
    monkeyBusiness.playRounds(20);

    expect(monkeyBusiness.monkeys[0].items).toEqual([10, 12, 14, 26, 34]);
    expect(monkeyBusiness.monkeys[1].items).toEqual([245, 93, 53, 199, 115]);
  });

  test('solvePart1', () => {
    expect(solvePart1(input)).toBe(10605);
  });

});

describe('part 2', () => {
  test('after 20 rounds', () => {
    const monkeyBusiness = new MonkeyBusiness2(parseInput(input));
    monkeyBusiness.playRounds(20);

    expect(monkeyBusiness.monkeys[0].itemsInspected).toBe(99);
    expect(monkeyBusiness.monkeys[1].itemsInspected).toBe(97);
    expect(monkeyBusiness.monkeys[2].itemsInspected).toBe(8);
    expect(monkeyBusiness.monkeys[3].itemsInspected).toBe(103);
  });

  test('after 1000 rounds', () => {
    const monkeyBusiness = new MonkeyBusiness2(parseInput(input));
    monkeyBusiness.playRounds(1000);

    expect(monkeyBusiness.monkeys[0].itemsInspected).toBe(5204);
    expect(monkeyBusiness.monkeys[1].itemsInspected).toBe(4792);
    expect(monkeyBusiness.monkeys[2].itemsInspected).toBe(199);
    expect(monkeyBusiness.monkeys[3].itemsInspected).toBe(5192);
  });

  test('after 10000 rounds', () => {
    const monkeyBusiness = new MonkeyBusiness2(parseInput(input));
    monkeyBusiness.playRounds(10000);

    expect(monkeyBusiness.monkeys[0].itemsInspected).toBe(52166);
    expect(monkeyBusiness.monkeys[1].itemsInspected).toBe(47830);
    expect(monkeyBusiness.monkeys[2].itemsInspected).toBe(1938);
    expect(monkeyBusiness.monkeys[3].itemsInspected).toBe(52013);
  });

  test('solvePart2', () => {
    expect(solvePart2(input)).toBe(2713310158);
  })

});