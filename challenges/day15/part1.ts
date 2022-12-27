import parseInput, { type SensorData } from "./parseInput";

type SensorDataWithDistance = SensorData & {
  distance: number;
};

const main = (input: string) => {
  const parsedInput = prepareInput(input);
  return countBeaconlessPositions(parsedInput, 2000000);
};

export const prepareInput = (input: string): SensorDataWithDistance[] => {
  return parseInput(input).map(sensorData => ({
    ...sensorData,
    distance: calculateManhattanDistanceBetweenSensorAndBeacon(sensorData)
  }));
};

export const countBeaconlessPositions = (sensors: SensorDataWithDistance[], row: number) => {
  const beaconsAtRow = sensors.filter(sensorData => sensorData.beaconY === row);
  const beaconPositionsAtRow = new Set(beaconsAtRow.map(({ beaconX }) => beaconX));
  const beaconlessRanges = sensors.map(sensorData => getReachForRow(sensorData, row));

  const beaconlessPositions = new Set<number>();
  for (const range of beaconlessRanges) {
    const { xMin, xMax } = range;
    for (let i = xMin; i <= xMax; i++) {
      if (!beaconlessPositions.has(i) && !beaconPositionsAtRow.has(i)) {
        beaconlessPositions.add(i);
      }
    }
  }

  return beaconlessPositions.size;
};

const calculateManhattanDistanceBetweenSensorAndBeacon = (sensorData: SensorData) => {
  const { sensorX, sensorY, beaconX, beaconY } = sensorData;
  const xDistance = Math.abs(sensorX - beaconX);
  const yDistance = Math.abs(sensorY - beaconY);
  return xDistance + yDistance;
};

const getReachForRow = (sensorData: SensorDataWithDistance, row: number) => {
  const { sensorX, sensorY, distance } = sensorData;
  const verticalDistance = Math.abs(row - sensorY);
  const remainingDistance = distance - verticalDistance;
  const xMin = sensorX - remainingDistance;
  const xMax = sensorX + remainingDistance;
  return { xMin, xMax };
};


export default main;