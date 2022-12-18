const parseInput = (input: string) => {
  return input
    .trim()
    .split('\n')
    .map(parseLine);
};

const parseLine = (line: string) => {
  return line.split(' -> ')
    .map(coords => coords.split(',').map(coord => parseInt(coord, 10)));
};

export default parseInput;