const main = (input: string) => {
  return findSignalEndIndex(input.trim());
};

const findSignalEndIndex = (input: string) => {
  const markerSize = 14;
  for (let i = markerSize; i <= input.length; i++) {
    const slice = input.slice(i - markerSize, i);
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