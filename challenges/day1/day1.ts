import path from 'path';
import fs from 'fs';

import solvePart1 from './part1';

const pathToInput = path.resolve(__dirname, './input.txt');
const input = fs.readFileSync(pathToInput, { encoding: 'utf-8' });


console.log('solution to day1 part 1:', solvePart1(input));