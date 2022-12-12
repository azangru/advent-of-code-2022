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
  const operationFnStr = `(old) => ${operationFnBodyStr}`;
  const operationFn = eval(operationFnStr);

  const divisibleBy = parseInt(lines[3].match(/(\d+)/)?.[1] as string, 10);
  const nextMonkeyIfTrue = parseInt(lines[4].match(/(\d+)/)?.[1] as string, 10);
  const nextMonkeyIfFalse = parseInt(lines[5].match(/(\d+)/)?.[1] as string, 10);
  const getNextMonkeyId = (num: number) => {
    return num % divisibleBy === 0
      ? nextMonkeyIfTrue
      : nextMonkeyIfFalse;
  };

  return {
    monkeyId,
    startItems,
    operationFn,
    dividesBy: divisibleBy,
    getNextMonkeyId
  };
};

export default parseInput;