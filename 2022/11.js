
const parseBlock = (block) => {
    const lines = block.split("\n");
    const id = +lines[0].match(/Monkey (\d+):/)[1];
    const items = lines[1].match(/Starting items: (.+)/)[1].split(",").map(s => +s);
    const opTokens = lines[2].match(/Operation: new = (.+)/)[1].split(" ");
    const testVal = +lines[3].match(/Test: divisible by (.+)/)[1];
    const trueVal = +lines[4].match(/If true: throw to monkey (.+)/)[1];
    const falseVal = +lines[5].match(/If false: throw to monkey (.+)/)[1];
    return {id, items, opTokens, testVal, trueVal, falseVal, inspections: 0, maxWorry: 0};
}

const calcWorryLevel = (oldLevel, opTokens) => {
    const [aToken, operatorToken, bToken] = opTokens;
    const a = aToken === "old" ? oldLevel : parseInt(aToken);
    const b = bToken === "old" ? oldLevel : parseInt(bToken);
    switch (operatorToken) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        default: throw "Unhandled operator";
    }
}

const processMonkey = (monkeys, index, reduceWorryLevel) =>  {
    const monkey = monkeys[index];
    const {items, opTokens, testVal, trueVal, falseVal} = monkey;
    while (items.length > 0) {
        const itemWorryLevel = items.shift();
        const prelimWorryLevel = calcWorryLevel(itemWorryLevel, opTokens);
        const reducedWorryLevel = reduceWorryLevel(prelimWorryLevel);
        const recipientIndex = (reducedWorryLevel % testVal === 0) ? trueVal : falseVal;
        const recipient = monkeys[recipientIndex];
        recipient.items.push(reducedWorryLevel);
        monkey.inspections++;
        monkey.maxWorry = Math.max(monkey.maxWorry, reducedWorryLevel); 
    }
}

const processRound = (monkeys, reduceWorry) => {
    for (let i = 0; i < monkeys.length; i++) {
        processMonkey(monkeys, i, reduceWorry);
    }
}

const process = (monkeys, rounds, reduceWorry) => {
    while (rounds--) {
        processRound(monkeys, reduceWorry);
    }
}

const getMonkeyBusinessLevel = (monkeys) => {
    const inspections = monkeys.map(monkey => monkey.inspections);
    inspections.sort((a, b) => b - a);
    return inspections[0] * inspections[1];
}

const solve = (input) => {
    const blocks = input.split("\n\n");

    const monkeys1 = blocks.map(parseBlock);
    const reduceWorry1 = (level) => Math.floor(level / 3);
    process(monkeys1, 20, reduceWorry1);
    const result1 = getMonkeyBusinessLevel(monkeys1);

    const monkeys2 = blocks.map(parseBlock);
    const testValsProduct = monkeys2.map(m => m.testVal).reduce((a, b) => a * b);
    const reduceWorry2 = (level) => level % testValsProduct;
    process(monkeys2, 10_000, reduceWorry2);
    const result2 = getMonkeyBusinessLevel(monkeys2);

    return [result1, result2];
}

const example = 
`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const challenge = 
`Monkey 0:
Starting items: 52, 78, 79, 63, 51, 94
Operation: new = old * 13
Test: divisible by 5
  If true: throw to monkey 1
  If false: throw to monkey 6

Monkey 1:
Starting items: 77, 94, 70, 83, 53
Operation: new = old + 3
Test: divisible by 7
  If true: throw to monkey 5
  If false: throw to monkey 3

Monkey 2:
Starting items: 98, 50, 76
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 0
  If false: throw to monkey 6

Monkey 3:
Starting items: 92, 91, 61, 75, 99, 63, 84, 69
Operation: new = old + 5
Test: divisible by 11
  If true: throw to monkey 5
  If false: throw to monkey 7

Monkey 4:
Starting items: 51, 53, 83, 52
Operation: new = old + 7
Test: divisible by 3
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 5:
Starting items: 76, 76
Operation: new = old + 4
Test: divisible by 2
  If true: throw to monkey 4
  If false: throw to monkey 7

Monkey 6:
Starting items: 75, 59, 93, 69, 76, 96, 65
Operation: new = old * 19
Test: divisible by 17
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 7:
Starting items: 89
Operation: new = old + 2
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 4`;

console.log("Example", solve(example)); 
console.log("Challenge", solve(challenge)); 
