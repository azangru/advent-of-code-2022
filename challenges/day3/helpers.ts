export const splitLine = (line: string): [string, string] => {
  return [
    line.slice(0, line.length/2),
    line.slice(line.length/2, line.length),
  ];
};

export const findDuplicates = (line: [string, string]) => {
  const [first, second] = line;

  const duplicatesInLeftPartition = findDuplicatesWithinString(first);
  const duplicatesInRightPartition = findDuplicatesWithinString(second);;
  const duplicatesBetweenStrings = findDuplicatesBetweenStrings(first, second);

  return {
    duplicatesInLeftPartition,
    duplicatesInRightPartition,
    duplicatesBetweenStrings
  };
};

const findDuplicatesWithinString = (str: string): Map<string, number> => {
  const resultMap = new Map<string, number>();

  for (const letter of str.split('')) {
    const map: Map<string, number> = new Map();
    if (!map.has(letter)) {
      map.set(letter, 1);
    } else {
      const count = map.get(letter) as number;
      const newCount = count +1;
      map.set(letter, newCount);
      resultMap.set(letter, newCount);
    }
  }

  return resultMap;
};

const findDuplicatesBetweenStrings = (str1: string, str2: string) => {
  const firstLetterSet = new Set<string>(Array.from(str1));
  const resultLetterSet = new Set<string>();

  for (const letter of str2) {
    if (firstLetterSet.has(letter)) {
      resultLetterSet.add(letter);
    }
  }

  return resultLetterSet;
};


export const getLetterCode = (letter: string) => {
  const letterCode = letter.charCodeAt(0);

  // lower-case Latin characters start at 97
  // upper-case Latin characters start at 65
  if (letterCode < 97) {
    return letterCode - 65 + 27; // for upper-case letters, score starts at 27
  } else {
    return letterCode - 97 + 1; // for lower-case letters, score starts at 1
  }
};