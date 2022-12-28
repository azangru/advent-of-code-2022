import parseInput, { type SensorData } from "./parseInput";

type SensorDataWithDistance = SensorData & {
  distance: number;
};

const main = (input: string) => {
  const parsedInput = prepareInput(input);
  const missingBeacons = findMissingBeacons(parsedInput, 4000000);

  console.log('missingBeacons', missingBeacons); // expect only one

  const missingBeaconPosition = missingBeacons[0];

  return getTuningFrequency(missingBeaconPosition);
};

export const prepareInput = (input: string): SensorDataWithDistance[] => {
  return parseInput(input).map(sensorData => ({
    ...sensorData,
    distance: calculateManhattanDistanceBetweenSensorAndBeacon(sensorData)
  }));
};

export const findMissingBeacons = (sensors: SensorDataWithDistance[], squareSide: number) => {
  let candidatePositions: { x: number, y: number }[] = [];

  for (let row = 0; row <= squareSide; row++) {
    const beaconlessRanges = sensors
      .map(sensorData => getReachForRow(sensorData, row))
      .filter(range => range !== null) as NonNullable<ReturnType<typeof getReachForRow>>[];

    const exploredRange = { from: 0, to: 0 };
    beaconlessRanges.sort((a, b) => a.xMin - b.xMin);

    for (const range of beaconlessRanges) {
      if (range.xMax < 0 || range.xMin > squareSide) {
        continue;
      }

      if (range.xMin > exploredRange.to + 1) {
        candidatePositions = candidatePositions.concat(generateCandidatePositions(
          exploredRange.to + 1,
          range.xMin,
          row
        ));
      }

      exploredRange.to = Math.max(exploredRange.to, range.xMax);
    }
  }

  return candidatePositions;
};

export const getTuningFrequency = (position: {x: number, y: number}) => {
  return position.x * 4000000 + position.y;
};

const generateCandidatePositions = (xFrom: number, xTo: number, y: number) => {
  const positions: { x: number, y: number }[] = [];
  for (let i = xFrom; i < xTo; i++) {
    positions.push({ x: i, y });
  }
  return positions;
}

const calculateManhattanDistanceBetweenSensorAndBeacon = (sensorData: SensorData) => {
  const { sensorX, sensorY, beaconX, beaconY } = sensorData;
  const xDistance = Math.abs(sensorX - beaconX);
  const yDistance = Math.abs(sensorY - beaconY);
  return xDistance + yDistance;
};

const getReachForRow = (sensorData: SensorDataWithDistance, row: number): { xMin: number, xMax: number } | null => {
  const { sensorX, sensorY, distance } = sensorData;
  const verticalDistance = Math.abs(row - sensorY);
  const remainingDistance = distance - verticalDistance;

  if (remainingDistance < 1) {
    return null;
  }

  const xMin = sensorX - remainingDistance;
  const xMax = sensorX + remainingDistance;

  if (xMax < xMin) {
    console.log('WTF?');
  }
  return { xMin, xMax };
};


export default main;