import parseInput from './parseInput';

const main = (input: string) => {
  const allPackets: any[] = parseInput(input)
    .flatMap((pair) => {
      const [str1, str2] = pair;
      return [JSON.parse(str1), JSON.parse(str2)];
    });
  
  allPackets.sort((a: any, b: any) => {
    const areSorted = compareElements(a, b) ?? true;
    return areSorted ? -1 : 1;
  });

  const injectTwoBefore = allPackets.findIndex((packet) => {
    return compareElements(packet, [[2]] as any) === false; 
  });

  allPackets.splice(injectTwoBefore, 0, [[2]]);

  const injectSixBefore = allPackets.findIndex((packet) => {
    return compareElements(packet, [[6]] as any) === false; 
  });

  allPackets.splice(injectSixBefore, 0, [[6]]);

  return (injectTwoBefore + 1) * (injectSixBefore + 1);
};

export const compare = (left: any, right: any) => {
  return compareElements(left, right) ?? true;
};

type Element = number | number[] | undefined;

const compareElements = (left: Element, right: Element): boolean | null => {
  if (typeof left === 'number' && Array.isArray(right)) {
    left = [left];
  } else if (typeof right === 'number' && Array.isArray(left)) {
    right = [right];
  } else if (typeof left === 'number' && typeof right === 'number') {
    if (left !== right) {
      return left < right;
    }
  } else if (left === undefined && right !== undefined) {
    // left is shorter than the right; all good
    return true;
  } else if (right === undefined && left !== undefined) {
    // right is shorter than the left
    return false;
  }

  const arrLength = (left as number[]).length > (right as number[]).length
    ? (left as number[]).length
    : (right as number[]).length
  for (let i = 0; i < arrLength; i++) {
    const isInOrder = compareElements((left as number[])[i], (right as number[])[i]) ?? null;
    
    if (typeof isInOrder === 'boolean') {
      return isInOrder;
    }
  }

  return null;
};

export default main;
