const parseInput = (input: string) => {
  const trimmedInput = trimInput(input);
  
  const regex = /\n\n/;
  const [diagram, instructions] = trimmedInput.split(regex);

  return {
    crates: parseDiagram(diagram),
    instructions: parseInstructions(instructions)
  };
};

// This is to protect from empty lines in the start or in the end of the input
// Can't just use the .trim() method on strings, because the first valid line of the input may start with white space
const trimInput = (input: string) => {
  let trimmedStart = false;
  let trimmedEnd = false;

  const lines = input.split('\n');
  
  let startIndex = 0;
  let endIndex = lines.length - 1;

  while(!trimmedStart) {
    if (lines[startIndex].match(/\w/)) {
      trimmedStart = true;
    } else {
      startIndex++;
    }
  }

  while(!trimmedEnd) {
    if (lines[endIndex].match(/\w/)) {
      trimmedEnd = true;
    } else {
      endIndex--;
    }
  }

  return lines.slice(startIndex, endIndex + 1).join('\n');
};

const parseDiagram = (diagram: string): string[][] => {
  const lines = diagram.split('\n');
  const columnNumbersLine = lines.pop();
  const lastColumnNumberRegex = /(\d+)\W*$/; // last digit(s) before the end of the line
  const lastColumnNumberStr = columnNumbersLine?.match(lastColumnNumberRegex)?.[1] as string;
  const lastColumnNumber = parseInt(lastColumnNumberStr);

  const crates: string[][] = [];

  for (let rowIndex = lines.length - 1; rowIndex >=0; rowIndex--) {
    const row = lines[rowIndex];

    for (let column = 0; column < lastColumnNumber; column++) {
      const offsetLeft = 4 * column;
      const crateIndex = offsetLeft + 1;
      const crate = row[crateIndex]?.trim() || null;
      if (!crate) {
        continue;
      } else if (!crates[column]) {
        crates[column] = [crate];
      } else {
        crates[column].push(crate);
      }
    }
  }

  return crates;
};

const parseInstructions = (input: string) => {
  return input.split('\n')
    .map(line => {
      const [ amount, from, to ] = line.match(/(\d+)/g) as [string, string, string];
      return {
        amount: parseInt(amount),
        from: parseInt(from) - 1,
        to: parseInt(to) - 1
      };
    });
};

export default parseInput;