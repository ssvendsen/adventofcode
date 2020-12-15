const solve = (input) => {

    const numbers = input.split(",").map(n => +n);

    const run = (turns) => {

        // Track the last two turns each number has been spoken.  
        // Two or one 0 values means the number was not spoken yet or only once
        const lastSpokenTurnPairs = new Uint32Array(turns * 2);
        numbers.forEach((number, index) => lastSpokenTurnPairs[number * 2] = index + 1);

        let turn = numbers.length;
        let lastSpoken = numbers[turn - 1];
        let t1, t2;
        while (turn++ < turns) {
            t1 = lastSpokenTurnPairs[lastSpoken * 2];
            t2 = lastSpokenTurnPairs[lastSpoken * 2 + 1];
            if (t2 === 0) {
                lastSpoken = 0;
            } else {
                lastSpoken = Math.abs(t1 - t2);
            }
            t1 = lastSpokenTurnPairs[lastSpoken * 2];
            t2 = lastSpokenTurnPairs[lastSpoken * 2 + 1];
            if (t1 > t2) {
                lastSpokenTurnPairs[lastSpoken * 2 + 1] = turn;
            } else {
                lastSpokenTurnPairs[lastSpoken * 2] = turn;
            }
        }
        return lastSpoken;
    }

    const result1 = run(2020);
    const result2 = run(30000000);

    return [result1, result2];
}

const example = 
`0,3,6`;

const challenge = 
`2,0,6,12,1,3`;

console.log(solve(example)); 
console.log(solve(challenge)); 
