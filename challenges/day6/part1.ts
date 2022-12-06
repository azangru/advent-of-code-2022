const main = (input: string) => {
  return findSignalEndIndex(input.trim());
};

const findSignalEndIndex = (input: string) => {
  for (let i = 4; i <= input.length; i++) {
    const slice = input.slice(i - 4, i);
    if (hasAllDifferentCharacters(slice)) {
      return i;
    }
  }
};

const hasAllDifferentCharacters = (input: string) => {
  const characterSet = new Set(Array.from(input));
  return characterSet.size === input.length;
};

export default main;