const parseInput = (input: string): string[][] => {
  return input
    .trim()
    .split('\n')
    .map(line => line.split(' '));
};

export default parseInput;