import { findDuplicates, splitLine, getLetterCode } from "./helpers";

const solvePart2 = (input: string) => {
  const lines = input.trim().split('\n');
  const groups = groupByThree(lines);

  return groups.map(findSingleCommonLetterInGroup)
    .map(getLetterCode)
    .reduce((acc, current) => acc + current, 0);
};

const groupByThree = (lines: string[]): string[][] => {
  const groups: string[][] = [];
  let group: string[] = [];

  for (const line of lines) {
    if (group.length === 3) {
      groups.push(group);
      group = [];
    }
    group.push(line);
  }

  groups.push(group);

  return groups;
};

const findSingleCommonLetterInGroup = (group: string[]) => {
  const [first, second, third] = group;
  const firstLetterSet = new Set(Array.from(first));
  const secondLetterSet = new Set(Array.from(second));

  let commonLetters = new Set<string>(); // should only be one, but who knows?

  for (const letter of third) {
    if (firstLetterSet.has(letter) && secondLetterSet.has(letter)) {
      commonLetters.add(letter);
    }
  }

  return [...commonLetters.values()].pop() as string;
};

export default solvePart2;