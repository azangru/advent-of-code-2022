const parseInput = (input: string) => {
  return input.trim()
    .split('\n')
    .map(parseLine); 
};

const parseLine = (line: string) => {
  return line.split('')
    .map(digit => parseInt(digit, 10));
};

export default parseInput;