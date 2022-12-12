/**
 * I had to look up the principle behind the solution of this part.
 * 
 * Without dividing every worry level by 3 (as in part 1), the value of worry level
 * very quickly overflows the 64 bits used for numbers in JavaScript. A brute-force
 * attempt at a solution using BigInts will take too long a time to compute. Thus,
 * a smarter solution had to be found.
 * 
 * It turns out that this smarter solution is to reduce the worry level by
 * using a modulus calculated as a product of all divisors applied by the monkeys.
 * This ensures both that the worry level stays within reasonable limits, and that
 * the calculations applied by any given monkey to determine which monkey to throw
 * an item next will still be correct.
 */

import parseInput from './parseInput';

const main = (input: string) => {
  const monkeyData = parseInput(input);
  const monkeyBusiness = new MonkeyBusiness(monkeyData);

  monkeyBusiness.playRounds(10000);

  monkeyBusiness.monkeys.sort((m1, m2) => m2.itemsInspected - m1.itemsInspected);
  const mostActiveMonkeys = monkeyBusiness.monkeys.slice(0, 2);

  const [ monkey1, monkey2 ] = mostActiveMonkeys;
  return monkey1.itemsInspected * monkey2.itemsInspected;
};

export class MonkeyBusiness {
  round = 0;
  monkeys: Monkey[];

  constructor(public monkeyData: ReturnType<typeof parseInput>) {
    const commonMonkeyModulus = this.getCommonMonkeyModulus(monkeyData);
    this.monkeys = monkeyData.map((data) => new Monkey(
      data.monkeyId,
      data.startItems,
      data.operationFn,
      data.getNextMonkeyId,
      commonMonkeyModulus
    ));
  }

  getCommonMonkeyModulus(monkeyData: ReturnType<typeof parseInput>) {
    return monkeyData.reduce((acc, { dividesBy }) => acc * dividesBy, 1);
  }

  playRounds(count: number) {
    for (let i = 0; i < count; i++) {
      this.playRound();
    }
  }

  playRound() {
    for (const monkey of this.monkeys) {
      const itemsToPass = monkey.playRound();
      for (const itemData of itemsToPass) {
        const { item, nextMonkeyId } = itemData;
        const nextMonkey = this.monkeys.find(monkey => monkey.id === nextMonkeyId) as Monkey;
        nextMonkey.takeItem(item);
      }
    }
  }

}


export class Monkey {
  public itemsInspected = 0;

  constructor(
    public id: number,
    public items: number[],
    private increaseWorryLevel: (num: number) => number,
    private getNextMonkeyId: (num: number) => number,
    private modulus: number
  ) {}

  takeItem(item: number) {
    this.items.push(item);
  }

  playRound() {
    const results: { item: number, nextMonkeyId: number }[] = [];
    while (this.items.length) {
      const item = this.items.shift() as number;
      const result = this.inspectItem(item);
      results.push(result);
    }
    return results;
  }

  inspectItem = (item: number) => {
    this.itemsInspected++;
    let worryLevel = this.increaseWorryLevel(item);
    worryLevel = worryLevel % this.modulus;
    const nextMonkeyId = this.getNextMonkeyId(worryLevel);
    return { item: worryLevel, nextMonkeyId };
  }

}


export default main;