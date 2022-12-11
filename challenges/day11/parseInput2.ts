import { X } from "vitest/dist/types-de0e0997";

const parseInput = (input: string) => {
  return input.trim()
    .split('\n\n')
    .map(monkeyData => parseMonkeyData(monkeyData))
};

const parseMonkeyData = (input: string) => {
  const lines = input.split('\n');
  const monkeyId = parseInt(lines[0].match(/(\d+)/)?.[1] as string, 10);
  const startItems = (lines[1].match(/(\d.*)$/)?.[1] as string)
    .split(', ')
    .map(item => parseInt(item, 10));

  const operationFnBodyStr = lines[2].split(' = ')[1];
  const operationFn = createOperationFn(operationFnBodyStr) as ((x: bigint) => bigint);

  const divisibleBy = parseInt(lines[3].match(/(\d+)/)?.[1] as string, 10);
  const nextMonkeyIfTrue = parseInt(lines[4].match(/(\d+)/)?.[1] as string, 10);
  const nextMonkeyIfFalse = parseInt(lines[5].match(/(\d+)/)?.[1] as string, 10);
  const getNextMonkeyId = (num: bigint) => {
    return num % BigInt(divisibleBy) === 0n
      ? nextMonkeyIfTrue
      : nextMonkeyIfFalse;
  };

  return {
    monkeyId,
    startItems,
    operationFn,
    getNextMonkeyId
  };
};

const createOperationFn = (str: string) => {
  const [, sign, value] = str.split(' ');
  if (value === 'old') {
    if (sign === '+') {
      return (x: bigint) => add(x, x);
    } else if (sign === '*') {
      return (x: bigint) => multiply(x, x);
    }
  } else {
    if (sign === '+') {
      return (x: bigint) => add(x, BigInt(value));
    } else if (sign === '*') {
      return (x: bigint) => multiply(x, BigInt(value));
    }
  }
};

const add = (a: bigint, b: bigint) => a + b;

const multiply = (a: bigint, b: bigint) => a * b;

export default parseInput;