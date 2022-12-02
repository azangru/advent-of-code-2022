import parseInput from "./parseInput";

const opponentSymbols = ['A', 'B', 'C']; // A for rock, B for paper, C for scissors
const mySymbols = ['X', 'Y', 'Z']; // X for rock, Y for paper, Z for scissors

const scores: Record<string, number> = {
  win: 6,
  draw: 3,
  loss: 0
};

const solve1 = (input: string) => {
  const parsedInput = parseInput(input);
  return countScore(parsedInput);
};

const countScore = (pairs: string[][]) => {
  let score = 0;

  for (const pair of pairs) {
    const outcome = getOutcome(pair);
    const moveScore = getScore(outcome);
    score += moveScore;
  }

  return score;
};

const getOutcome = (pair: string[]) => {
  const [opponentMove, myMove] = pair;
  const opponentMoveIndex = opponentSymbols.indexOf(opponentMove);
  const myMoveIndex = mySymbols.indexOf(myMove);
  const nextOpponentIndex = (opponentMoveIndex + 1) % opponentSymbols.length;

  if (opponentMoveIndex === myMoveIndex) {
    return [myMove, 'draw'];
  } else if (myMoveIndex === nextOpponentIndex) {
    return [myMove, 'win'];
  } else {
    return [myMove, 'loss'];
  }
};

const getScore = (pair: string[]) => {
  const [shape, outcome] = pair;
  const shapeScore = mySymbols.indexOf(shape) + 1;
  const outcomeScore = scores[outcome];
  return shapeScore + outcomeScore;
};

export default solve1;