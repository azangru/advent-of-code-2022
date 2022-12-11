export type Instruction = {
  command: string;
  value?: number;
};

const parseInput = (input: string) => {
  return input.trim()
    .split('\n')
    .map(parseLine)
};

const parseLine = (line: string) => {
  const [command, value] = line.trim().split(' ');
  const instruction: Instruction = {
    command
  };

  if (value) {
    instruction.value = parseInt(value, 10);
  }

  return instruction;
};

export default parseInput;