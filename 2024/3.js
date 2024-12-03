const solve = (input) => {

    const lines = input.split("\n");

    const matcher = new RegExp(/mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g);
    const instructions = input.match(matcher);

    const process = (instructions, allowSkip) => {
        const numbers = [];
        let enabled = true;
        instructions.forEach(instr => {
            const cmd = instr.slice(0, instr.indexOf('('));
            if (cmd === 'mul' && enabled) {
                const [, a, b] = instr.match(/(\d+),(\d+)/);
                const r = +a * +b;
                numbers.push(r);
            } else if (cmd === 'do' && allowSkip) {
                enabled = true;
            } else if (cmd === "don't" && allowSkip) {
                enabled = false;
            }
        });
        return numbers;
    }
   
    const result1 = process(instructions, false).reduce((acc, e) => acc + e, 0);
    const result2 = process(instructions, true).reduce((acc, e) => acc + e, 0);

    return [result1, result2];
}

const example = 
`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const fs = require('node:fs');
const challenge = fs.readFileSync(`${__dirname}/3.txt`, 'utf8');

console.log("Example", solve(example)); 
console.log("Challenge", solve(challenge)); 
