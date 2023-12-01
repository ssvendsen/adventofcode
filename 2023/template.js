const solve = (input) => {

    const lines = input.split("\n");

    const getFirstAndLastDigit = (line) => {
        const digits = line.split("");
        const first = digits.find(d => !isNaN(d))
        const last = digits.findLast(d => !isNaN(d))
        return parseInt(`${first}${last}`);
    }

    const calibrations = lines.map(getFirstAndLastDigit);

    const sum = calibrations.reduce((sum, item) => sum + item, 0);

    const result1 = sum;
    const result2 = 0;

    return [result1, result2];
}

const example = 
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const challenge = 
``;

console.log("Example", solve(example)); 
console.log("Challenge", solve(challenge)); 
