const solve = (input) => {

    const labels = input.split("").map(l => parseInt(l));

    const move = (cups, current, max) => {
        // Pick three cups
        const picked0 = cups[current];
        const picked1 = cups[picked0];
        const picked2 = cups[picked1];
        const afterPicked = cups[picked2];
        cups[current] = afterPicked; 
        // Get destination cup
        let destination = current > 1 ? current - 1 : max;
        while ([picked0, picked1, picked2].includes(destination))
            destination = destination > 1 ? destination - 1 : max;
        // Put back cups
        const afterDestination = cups[destination];
        cups[destination] = picked0;
        cups[picked2] = afterDestination;
        // Return new current
        return cups[current];
    }

    const play = (cups, current, max, rounds) => {
        while (rounds--) {
            current = move(cups, current, max);
            //if (rounds % 1000_000 === 0)
            //    console.log("*");
        }
        const seq = [];
        let s = 1;
        while (seq.length < 8) {
            s = cups[s];
            seq.push(s);
        } 
        return seq; //.join("");
    }

    const cups = {};
    const start = labels[0];
    const end = labels[labels.length - 1];

    labels.reduce((prev, current) => cups[prev] = current, end);

    const result1 = play(cups, start, 9, 100).join("");

    labels.reduce((prev, current) => cups[prev] = current, end);
    cups[end] = labels.length + 1;
    for (let i = labels.length + 1; i < 1_000_000; i++) {
        cups[i] = i + 1;
    }
    cups[1_000_000] = start;


    const s = play(cups, start, 1_000_000, 10_000_000);
    const result2 = s[0] * s[1];

    return [result1, result2];
}

const example = 
`389125467`;

const challenge = 
`784235916`;

console.log(solve(example)); 
console.log(solve(challenge)); 
