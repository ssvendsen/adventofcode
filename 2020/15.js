const solve = (input) => {

    const numbers = input.split(",").map(n => +n);

    const run = (lim) => {

        // Track the last two occurences of each seen number
        const lastSpokenPairs = new Uint32Array(lim * 2);
        numbers.forEach((number, index) => lastSpokenPairs[number * 2] = index + 1);

        let turn = numbers.length;
        let last = numbers[turn - 1];
        while (turn++ < lim) {
            t1 = lastSpokenPairs[last * 2];
            t2 = lastSpokenPairs[last * 2 + 1];
            if (t2 === 0) {
                last = 0;
            } else {
                last = Math.abs(t1 - t2);
            }
            t1 = lastSpokenPairs[last * 2];
            t2 = lastSpokenPairs[last * 2 + 1];
            if (t1 > t2) {
                lastSpokenPairs[last * 2 + 1] = turn;
            } else {
                lastSpokenPairs[last * 2] = turn;
            }
        }
        return last;
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
