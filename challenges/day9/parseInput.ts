export type Instruction = {
  direction: 'R' | 'U' | 'L' | 'D';
  steps: number;
};

const parseInput = (input: string): Instruction[] => {
  return input.trim().split('\n')
    .map(line => {
      const [direction, steps] = line.trim().split(' ');
      return { direction, steps: parseInt(steps, 10) } as Instruction;
    });
};

export default parseInput;