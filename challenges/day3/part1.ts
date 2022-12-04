import { findDuplicates, splitLine, getLetterCode } from "./helpers";

const solvePart1 = (input: string) => {
  const lines = input.trim().split('\n');
  const partitions = lines.map(splitLine);
  return partitions
    .map(findDuplicates)
    .flatMap(({ duplicatesBetweenStrings }) => [...duplicatesBetweenStrings])
    .reduce((acc, letter) => acc + getLetterCode(letter), 0);
};


export default solvePart1;