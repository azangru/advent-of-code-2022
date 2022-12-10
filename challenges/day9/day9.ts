import path from 'path';
import fs from 'fs';

import solvePart1 from './part1';
import solvePart2 from './part2';

const pathToInput = path.resolve(__dirname, './input.txt');
const input = fs.readFileSync(pathToInput, { encoding: 'utf-8' });


console.log('solution to day 9 part 1:', solvePart1(input));
console.log('solution to day 9 part 2:', solvePart2(input));