import parseInput from "./parseInput";

const main = (input: string) => {
  const parsedInput = parseInput(input);
  return parsedInput.reduce((acc, pair) => {
    if (hasOverlaps(pair)) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
};

// checks whether one of the two segments has any overlap with the other whatsoever
const hasOverlaps = (pair: number[][]) => {
  const [first, second] = pair;

  const leftOverlapsRight = first[0] <= second[0] && first[1] >= second[0];
  const rightOverlapsLeft = second[0] <= first[0] && second[1] >= first[0];

  return leftOverlapsRight || rightOverlapsLeft;
}

export default main;