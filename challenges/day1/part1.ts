import parseInput from "./parseInput";

const solvePart1 = (input: string) => {
  const groups = parseInput(input);
  return findLargestTotal(groups);
};

const findLargestTotal = (groups: number[][]) => {
  let largestTotal = 0;

  for (const group of groups) {
    let currentTotal = 0;
    for (const num of group) {
      currentTotal += num;
    }
    if (currentTotal > largestTotal) {
      largestTotal = currentTotal;
    }
  }

  return largestTotal;
};

export default solvePart1;