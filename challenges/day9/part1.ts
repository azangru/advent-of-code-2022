import parseInput, { type Instruction } from './parseInput';

type Store = {
  head: number[],
  tail: number[],
  tailVisited: Map<string, number>
};

const main = (input: string) => {
  const store: Store = {
    head: [0, 0],
    tail: [0, 0],
    tailVisited: new Map([[JSON.stringify([0,0]), 1]])
  };

  for (const instruction of parseInput(input)) {
    move(instruction, store);
  }

  return [...store.tailVisited.keys()].length;
};

const move = (instruction: Instruction, store: Store) => {
  for (let i = 0; i < instruction.steps; i++) {
    instructionMap[instruction.direction](store);
  }
};

const moveRight = (store: Store) => {
  store.head[0] = store.head[0] + 1; // move head right
  if (store.head[0] - store.tail[0] > 1) {
    store.tail[0] = store.head[0] - 1;
    store.tail[1] = store.head[1];
    recordTailMove(store);
  }
};

const moveLeft = (store: Store) => {
  store.head[0] = store.head[0] - 1; // move head left
  if (store.tail[0] - store.head[0] > 1) {
    store.tail[0] = store.head[0] + 1;
    store.tail[1] = store.head[1];
    recordTailMove(store);
  }
};

const moveUp = (store: Store) => {
  store.head[1] = store.head[1] + 1; // move head up
  if (store.head[1] - store.tail[1] > 1) {
    store.tail[1] = store.head[1] - 1;
    store.tail[0] = store.head[0];
    recordTailMove(store);
  }
};

const moveDown = (store: Store) => {
  store.head[1] = store.head[1] - 1; // move head down
  if (store.tail[1] - store.head[1] > 1) {
    store.tail[1] = store.head[1] + 1;
    store.tail[0] = store.head[0];
    recordTailMove(store);
  }
};

const recordTailMove = (store: Store) => {
  const key = JSON.stringify(store.tail);
  if (store.tailVisited.has(key)) {
    store.tailVisited.set(key, store.tailVisited.get(key) as number + 1);
  } else {
    store.tailVisited.set(key, 1);
  }
};

const instructionMap = {
  R: moveRight,
  L: moveLeft,
  U: moveUp,
  D: moveDown
} as const;

export default main;