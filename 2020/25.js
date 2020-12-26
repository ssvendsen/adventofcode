const solve = (input) => {

    const publicKeys = input.split("\n").map(l => parseInt(l));

    // Set the value to itself multiplied by the subject number.
    // Set the value to the remainder after dividing the value by 20201227.
    const step = (subject, value) => {
        value *= subject;
        value %= 20201227;
        return value;
    }

    const testLoopSize = (publicKey) => {
        let value = 1;
        let loopSize = 0;
        while (value !== publicKey) {
            value = step(7, value);
            loopSize++;
        }
        return loopSize;
    }

    const loopSizes = publicKeys.map(pk => testLoopSize(pk));
    //loopSizes.forEach(ls => console.log(ls));

    const transform = (subject, loopSize) => {
        let value = 1;
        while (loopSize--) {
            value = step(subject, value);
        }
        return value;
    }

    const encryptionKeys = loopSizes.map((ls, i) => transform(publicKeys[1 - i], ls));
    //encryptionKeys.forEach((ek => console.log(ek)));
    if (encryptionKeys[0] !== encryptionKeys[1])
        throw "The two keys should be the same"

    const result1 = encryptionKeys[0];

    return [result1];
}

const example = 
`5764801   
17807724`; // card, door

const challenge = 
`17607508
15065270`;

console.log(solve(example)); 
console.log(solve(challenge)); 
