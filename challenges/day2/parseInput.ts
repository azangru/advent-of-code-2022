const parseInput = (input: string): string[][] => {
  return input.split('\n')
    .map(line => line.split(' '));
};

export default parseInput;