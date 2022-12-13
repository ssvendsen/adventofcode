const solve = (input) => {

    const lines = input.split("\n");

    const program = lines.map(line => {
        const tokens = line.split(" ");
        const instruction = tokens[0];
        switch (instruction) {
            case "addx": {
                return {
                    instruction,
                    value: parseInt(tokens[1])
                };
            }
            default: {
                return {
                    instruction
                };
            }
        }
    });

    const step = (state, operation, onCycle) => {
        let {cycleCounter, X} = state;
        const {instruction, value} = operation;
        switch (instruction) {
            case "addx": {
                onCycle(cycleCounter++, X);
                onCycle(cycleCounter++, X);
                X += value;
                break;
            }
            case "noop": {
                onCycle(cycleCounter++, X);
                break;
            }
        }
        return {cycleCounter, X};
    }

    const run = (state, operations, onCycle) => {
        for (let operation of operations) {
            state = step(state, operation, onCycle);
        }
        return state;
    }

    const initialState = {cycleCounter: 1, X: 1};

    const signalStrengths = [];
    run(initialState, program, (cycleCounter, X) => {
        if ((cycleCounter + 20) % 40 === 0) {
            signalStrengths.push(cycleCounter * X);
        }
    });

    const result1 = signalStrengths.reduce((a, b) => a + b, 0);

    const crt = [];
    run(initialState, program, (cycleCounter, spriteMiddleX) => {
        const crtX = (cycleCounter - 1) % 40;
        if (crtX === spriteMiddleX - 1 || crtX === spriteMiddleX || crtX === spriteMiddleX + 1) {
            crt.push("#");
        } else {
            crt.push(" ");
        }
    });
    while (crt.length > 0) {
        const crtLine = crt.splice(0, 40).join("");
        console.log(crtLine);
    }

    return [result1];
}

const example = 
`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const challenge = 
`addx 1
addx 4
addx -2
addx 3
addx 3
addx 1
noop
addx 5
noop
noop
noop
addx 5
addx 2
addx 3
noop
addx 2
addx 4
noop
addx -1
noop
addx 3
addx -10
addx -17
noop
addx -3
addx 2
addx 25
addx -24
addx 2
addx 5
addx 2
addx 3
noop
addx 2
addx 14
addx -9
noop
addx 5
noop
noop
addx -2
addx 5
addx 2
addx -5
noop
noop
addx -19
addx -11
addx 5
addx 3
noop
addx 2
addx 3
addx -2
addx 2
noop
addx 3
addx 4
noop
noop
addx 5
noop
noop
noop
addx 5
addx -3
addx 8
noop
addx -15
noop
addx -12
addx -9
noop
addx 6
addx 7
addx -6
addx 4
noop
noop
noop
addx 4
addx 1
addx 5
addx -11
addx 29
addx -15
noop
addx -12
addx 17
addx 7
noop
noop
addx -32
addx 3
addx -8
addx 7
noop
addx -2
addx 5
addx 2
addx 6
addx -8
addx 5
addx 2
addx 5
addx 17
addx -12
addx -2
noop
noop
addx 7
addx 9
addx -8
addx 2
addx -33
addx -1
addx 2
noop
addx 26
addx -22
addx 19
addx -16
addx 8
addx -1
addx 3
addx -2
addx 2
addx -17
addx 24
addx 1
noop
addx 5
addx -1
noop
addx 5
noop
noop
addx 1
noop
noop`;

console.log("Example", solve(example)); 
console.log("Challenge", solve(challenge)); 
