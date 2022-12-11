import parseInput, { Instruction } from './parseInput';

const main = (input: string) => {
  const program = parseInput(input);
  const computer = new Computer(program);

  return computer.getSignalDuringCycle(20)
    + computer.getSignalDuringCycle(60)
    + computer.getSignalDuringCycle(100)
    + computer.getSignalDuringCycle(140)
    + computer.getSignalDuringCycle(180)
    + computer.getSignalDuringCycle(220);
};

export class Computer {
  X = 1;
  cycle = 0;

  remainingInstructions: Instruction[];

  current: {
    instruction: Instruction | null;
    cycle: number
  }

  constructor(program: Instruction[]) {
    this.remainingInstructions = program;
    const firstInstruction = this.remainingInstructions.shift() as Instruction;
    this.current = {
      instruction: firstInstruction,
      cycle: 0
    };
  }

  runCycles(times: number) {
    for (let i = 0; i < times; i++) {
      this.tick();
    }
  }

  getSignalDuringCycle(cycle: number) {
    const cyclesToRun = cycle - this.cycle - 1;
    this.runCycles(cyclesToRun);
    return cycle * this.X;
  };

  tick() {
    if (!this.current.instruction) {
      const instruction = this.remainingInstructions.shift() as Instruction;
      this.current.instruction = instruction;
    }
    this.cycle++;
    this.current.cycle++;

    if (this.current.cycle === cyclesForCommand[this.current.instruction.command as keyof typeof cyclesForCommand]) {
      this.completeInstruction(this.current.instruction);
      this.cleanCurrent();
    }
  }

  completeInstruction(instruction: Instruction) {
    if (instruction.command === 'addx') {
      this.runAddx(instruction.value as number);
    }
  }

  cleanCurrent() {
    this.current.instruction = null;
    this.current.cycle = 0;
  }

  runAddx(value: number) {
    this.X += value;
  }
}

const cyclesForCommand = {
  noop: 1,
  addx: 2
};

export default main;