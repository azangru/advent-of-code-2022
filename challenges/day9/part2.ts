import parseInput, { type Instruction } from './parseInput';

type Store = {
  train: number[][],
  tailVisited: Set<string>
};

const main = (input: string) => {
  const train = [...Array(10)].map(() => [0, 0]);
  const store: Store = {
    train,
    tailVisited: new Set([JSON.stringify([0,0])])
  };

  for (const instruction of parseInput(input)) {
    move(instruction, store);
  }

  return [...store.tailVisited.keys()].length;
};

const move = (instruction: Instruction, store: Store) => {
  for (let i = 0; i < instruction.steps; i++) {
    instructionMap[instruction.direction](store);
    moveOtherNodes(store);
    recordTailMove(store);
  }
};

const moveHeadRight = (store: Store) => {
  const head = store.train[0];
  head[0] = head[0] + 1;
};

const moveHeadLeft = (store: Store) => {
  const head = store.train[0];
  head[0] = head[0] - 1;
};

const moveHeadUp = (store: Store) => {
  const head = store.train[0];
  head[1] = head[1] + 1;
};

const moveHeadDown = (store: Store) => {
  const head = store.train[0];
  head[1] = head[1] - 1;
};

const moveOtherNodes = (store: Store) => {
  const { train } = store;
  for (let i = 1; i < train.length; i++) {
    chase(train[i - 1], train[i]);
  }
};

const recordTailMove = (store: Store) => {
  const tail = store.train.at(-1);
  store.tailVisited.add(JSON.stringify(tail));
};


export const chase = (head: number[], tail: number[]) => {
  const [headX, headY] = head;
  let moveX = 0;
  let moveY = 0;

  if (Math.abs(tail[0] - headX) > 1) {
    moveX = headX > tail[0] ? 1 : -1;
    moveY = headY === tail[1]
      ? 0
      : headY > tail[1]
        ? 1
        : -1;
  } else if (Math.abs(tail[1] - headY) > 1) {
    moveY = headY > tail[1] ? 1 : -1;
    moveX = headX === tail[0]
      ? 0
      : headX > tail[0]
        ? 1
        : -1;
  }
  tail[0] = tail[0] + moveX;
  tail[1] = tail[1] + moveY;
};


const instructionMap = {
  R: moveHeadRight,
  L: moveHeadLeft,
  U: moveHeadUp,
  D: moveHeadDown
} as const;

export default main;