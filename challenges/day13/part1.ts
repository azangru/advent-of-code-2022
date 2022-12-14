import parseInput from './parseInput';

const main = (input: string) => {
  return parseInput(input)
    .map((pair, index) => {
      console.log(pair, compare(pair as [string, string]));
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
  if (typeof left === 'number' && Array.isArray(right)) {
    left = [left];
  } else if (typeof right === 'number' && Array.isArray(left)) {
    right = [right];
  } else if (typeof left === 'number' && typeof right === 'number') {
    if (left !== right) {
      return left < right;
    }
  } else if (left === undefined && right !== undefined) {
    // left is shorter than the right; all good
    return true;
  } else if (right === undefined && left !== undefined) {
    // right is shorter than the left
    return false;
  }

  for (let i = 0; i < (left as number[]).length; i++) {
    const isInOrder = compareElements((left as number[])[i], (right as number[])[i]) ?? null;
    
    if (typeof isInOrder === 'boolean') {
      return isInOrder;
    }

  }

  return null;
};

export default main;


// TODO: compare with this guy's solution? What's the difference? https://github.com/joeleisner/advent-of-code-2022/tree/main/days/13