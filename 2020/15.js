
const { performance } = require('perf_hooks');

const solve = (input) => {

    const startingNumbers = input.split(",").map(n => +n);

    const run = (turns) => {

        const start = performance.now();

        // Keep an array with two slots for each number that has been spoken. 
        // The two slots holds the last two turns that the number was spoken.
        // If both slots are 0, the number has not been spoken. If only the
        // second slot is 0, the number has been spoken once. 

        //const lastSpokenTurns = new Array(turns * 2).fill(0);
        const lastSpokenTurns = new Uint32Array(turns * 2);
        //const lastSpokenTurns = new Int32Array(turns * 2);
        //const lastSpokenTurns = new Float64Array(turns * 2);

        startingNumbers.forEach((number, index) => lastSpokenTurns[number * 2] = index + 1);

        let turn = startingNumbers.length;
        let lastSpoken = startingNumbers[turn - 1];
        let t1 = lastSpokenTurns[lastSpoken * 2];
        let t2 = 0;

        while (turn++ < turns) {
            lastSpoken = t2 === 0 ? 0 : Math.abs(t1 - t2);
            const t1Slot = lastSpoken * 2;
            const t2Slot = t1Slot + 1;
            t1 = lastSpokenTurns[t1Slot];
            t2 = lastSpokenTurns[t2Slot];
            if (t1 > t2) {
                lastSpokenTurns[t2Slot] = turn;
                t2 = turn;
            } else {
                lastSpokenTurns[t1Slot] = turn;
                t1 = turn;
            }
        }

        // console.log(`Time for ${turns} turns with starting numbers ${input} is`, performance.now() - start, "ms, with", lastSpokenTurns.constructor.name);

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
