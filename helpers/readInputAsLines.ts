import fs from 'fs';

export const readInputAsLines = (pathToFile: string) => {
  return fs.readFileSync(pathToFile, { encoding: 'utf-8' }).split('\n');
};