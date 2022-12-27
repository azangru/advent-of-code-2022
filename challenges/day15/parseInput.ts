export type SensorData = {
  sensorX: number,
  sensorY: number,
  beaconX: number,
  beaconY: number
};

const parseInput = (input: string) => {
  return input.trim().split('\n')
    .map(line => parseLine(line));
};

const parseLine = (line: string) => {
  const regexForX = /x=(-?\d+)/g;
  const regexForY = /y=(-?\d+)/g;
  const [sensorXMatch, beaconXMatch] = line.matchAll(regexForX);
  const [sensorYMatch, beaconYMatch] = line.matchAll(regexForY);
  return {
    sensorX: parseInt(sensorXMatch[1], 10),
    sensorY: parseInt(sensorYMatch[1], 10),
    beaconX: parseInt(beaconXMatch[1], 10),
    beaconY: parseInt(beaconYMatch[1],10)
  };
};

export default parseInput;