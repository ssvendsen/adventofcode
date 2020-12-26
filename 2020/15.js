
const { performance } = require('perf_hooks');

const solve = (input) => {

    const startingNumbers = input.split(",").map(n => +n);

    const run = (turns) => {

        const start = performance.now();

        const turnWhenSpoken = new Uint32Array(turns);
        startingNumbers.forEach((number, index) => {
            turnWhenSpoken[number] = index + 1;
        });

        let t0 = 0;
        let t_ = 2;
        let turn = startingNumbers.length;
        while (turn < turns) {
            if (t0 === 0) {
                lastSpoken = 0;
                //t0 = t_;
                //t_ = ++turn;
                t0 = turnWhenSpoken[lastSpoken];
                turnWhenSpoken[lastSpoken] = ++turn;
            } else {
                lastSpoken = turn - t0; 
                t0 = turnWhenSpoken[lastSpoken];
                turnWhenSpoken[lastSpoken] = ++turn;
            }
        }

        // console.log(`${turns} turns with starting numbers ${input} took ${performance.now() - start} ms.`);

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
//`0,14,6,20,1,4`;
console.log(solve(example)); 
console.log(solve(challenge)); 
