const parseInput = (input: string) => {
  return input.trim()
    .split('\n')
    .map(line => line.split(''))
};

export const findStartAndEnd = (input: string[][]) => {
  let startPosition: [number, number] = [0, 0];
  let endPosition: [number, number] = [0, 0];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === 'S') {
        startPosition = [i, j];
      } else if (input[i][j] === 'E') {
        endPosition = [i, j];
      }
    }
  }

  return {
    startPosition: startPosition as [number, number],
    endPosition: endPosition as [number, number]
  }
}

export default parseInput