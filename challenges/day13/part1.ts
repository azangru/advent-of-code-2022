import parseInput from './parseInput';

const main = (input: string) => {
  return parseInput(input)
    .map((pair, index) => {
      return {
        isInRightOrder: compare(pair as [string, string]),
        index: index + 1
      }
    }).filter(result => result.isInRightOrder)
    .reduce((acc, curr) => acc + curr.index, 0);
};

export const compare = (pair: [string, string]) => {
  const [str1, str2] = pair;
  const left = JSON.parse(str1);
  const right = JSON.parse(str2);
  return compareElements(left, right) ?? true;
};

type Element = number | number[] | undefined;

const compareElements = (left: Element, right: Element): boolean | null => {
  let isInOrder: boolean | null = null;

  if (typeof left === 'number' && Array.isArray(right)) {
    left = [left];
  } else if (typeof right === 'number' && Array.isArray(left)) {
    right = [right];
  } else if (typeof left === 'number' && typeof right === 'number') {
    if (left !== right) {
      return left < right;
    }
  } else if (!left && right) {
    return true;
  } else if (!right && left) {
    return false;
  } else if (!right && !left) {
    return true;
  }

  for (let i = 0; i < (left as number[]).length; i++) {
    isInOrder = compareElements((left as number[])[i], (right as number[])[i]) ?? null;
    
    if (isInOrder !== null) {
      return isInOrder;
    }

  }

  return isInOrder;
};

export default main;