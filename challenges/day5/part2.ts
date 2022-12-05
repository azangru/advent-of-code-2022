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

  const columnFrom = crates[from];
  const columnTo = crates[to]; 

  const cratesToMove = columnFrom.splice(columnFrom.length - amount); // slice off a list of items from the source array
  Array.prototype.push.apply(columnTo, cratesToMove); // ... and push them all at once in the target array
};

export default main;