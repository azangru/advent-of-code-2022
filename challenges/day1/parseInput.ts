const parseInput = (input: string) => {
  const groups = input.split('\n\n');
  return groups
    .map(group => group.split('\n'))
    .map(lines => lines.map(line => parseInt(line)))
};

export default parseInput;