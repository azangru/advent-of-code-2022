import parseInput from './parseInput';

const solvePart2 = (input: string) => {
  const groups = parseInput(input);
  return findSumOfLargestThree(groups);
};


const findSumOfLargestThree = (groups: number[][]) => {
  const sums = getSums(groups);
  sums.sort((a, b) => b - a);
  const largestThree = sums.slice(0, 3);
  return largestThree.reduce((acc, num) => acc + num, 0);
};

const getSums = (groups: number[][]) => {
  return groups.map(group => group.reduce((acc, num) => num + acc, 0));
};

export default solvePart2;