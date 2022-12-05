import parseInput from './parseInput';

const main = (input: string) => {
  const { crates, instructions } = parseInput(input);

  for (const line of instructions) {
    move(crates, line);
  }

  return crates.reduce((acc, column) => {
    return acc + column.at(-1);
  }, '');
};

const move = (crates: string[][], instruction: { amount: number, from: number, to: number }) => {
  const { amount, from, to } = instruction;
  for (let i = 0; i < amount; i++) {
    const crate = crates[from].pop();
    if (!crate) {
      console.log('panic!');
      break;
    }
    crates[to].push(crate);
  }
};

export default main;