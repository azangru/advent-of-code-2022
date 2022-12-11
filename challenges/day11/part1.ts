import parseInput from './parseInput';

const main = (input: string) => {
  const monkeyData = parseInput(input);
  const monkeys = monkeyData.map(data => {
    return new Monkey(
      data.monkeyId,
      data.startItems,
      data.operationFn,
      data.getNextMonkeyId
    );
  });

  const monkeyBusiness = new MonkeyBusiness(monkeys);

  monkeyBusiness.playRounds(20);

  monkeyBusiness.monkeys.sort((m1, m2) => m2.itemsInspected - m1.itemsInspected);
  const mostActiveMonkeys = monkeyBusiness.monkeys.slice(0, 2);

  const [ monkey1, monkey2 ] = mostActiveMonkeys;
  return monkey1.itemsInspected * monkey2.itemsInspected;
};


export class Monkey {
  public itemsInspected = 0;

  constructor(
    public id: number,
    public items: number[],
    private increaseWorryLevel: (num: number) => number,
    private getNextMonkeyId: (num: number) => number
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
    worryLevel = Math.floor(worryLevel / 3);
    const nextMonkeyId = this.getNextMonkeyId(worryLevel);
    return { item: worryLevel, nextMonkeyId };
  }

}

export class MonkeyBusiness {
  round = 0;

  constructor(public monkeys: Monkey[]) {

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


export default main;