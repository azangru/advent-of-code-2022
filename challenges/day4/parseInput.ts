// transform lines such as "2-4,6-8" into arrays of arrays: [[2, 4], [6, 8]]
const parseInput = (input: string) =>
  input
    .trim()
    .split('\n')
    .map(line => line.split(','))
    .map((pair) => {
      const [first, second] = pair;
      return [
        first.split('-').map(num => parseInt(num)),
        second.split('-').map(num => parseInt(num))
      ]
    });

export default parseInput;