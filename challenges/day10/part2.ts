import parseInput from './parseInput';
import { Computer } from './part1';

const ROWS = 6;
const LINE_LENGTH = 40;

const main = (input: string) => {
  const program = parseInput(input);
  const computer = new Computer(program);

  const lines: string[] = [];
  for (let i = 0; i < ROWS; i++) {
    const line = drawLine(computer);
    lines.push(line);
  }

  return lines.join('\n');
};

const drawLine = (computer: Computer) => {
  let line: string[] = ['#'];
  for (let i = 0; i < LINE_LENGTH; i++) {
    computer.tick();

    const position = i + 1;

    if (position >= computer.X - 1 && position <= computer.X + 1) {
      line.push('#');
    } else {
      line.push('.');
    }
  }

  return line.join('');
};

export default main;