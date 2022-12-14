const parseInput = (input: string) => {
  input = input.trim();
  return input.split('\n\n')
    .map(pair => pair.split('\n'))
};

export default parseInput;