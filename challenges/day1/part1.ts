const solvePart1 = (input: string) => {
  const groups = parseInput(input);
  return findLargestTotal(groups);
};

const parseInput = (input: string) => {
  const groups = input.split('\n\n');
  return groups
    .map(group => group.split('\n'))
    .map(lines => lines.map(line => parseInt(line)))
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