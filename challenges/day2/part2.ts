import parseInput from "./parseInput";

const shapeSymbols = ['A', 'B', 'C']; // A for rock, B for paper, C for scissors

const scores: Record<string, number> = {
  win: 6,
  draw: 3,
  loss: 0
};

const solve2 = (input: string) => {
  const parsedInput = parseInput(input);
  return countScore(parsedInput);
};

const countScore = (pairs: string[][]) => {
  let score = 0;

  for (const pair of pairs) {
    score += getScore(pair);
  }

  return score;
};

const getScore = (pair: string[]) => {
  const [opponentMove, outcomeCode] = pair;
  const opponentMoveIndex = shapeSymbols.indexOf(opponentMove);
  let outcome: string;
  let myMove: string;

  if (outcomeCode === 'X') {
    outcome = 'loss';
    myMove = shapeSymbols.at(opponentMoveIndex - 1) as string;
  } else if (outcomeCode === 'Y') {
    myMove = shapeSymbols[opponentMoveIndex]
    outcome = 'draw';
  } else {
    myMove = shapeSymbols[(opponentMoveIndex + 1) % shapeSymbols.length];
    outcome = 'win';
  }

  const myMoveIndex = shapeSymbols.indexOf(myMove);
  return myMoveIndex + 1 + scores[outcome];
};

export default solve2;