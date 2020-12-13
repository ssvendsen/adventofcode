const solve = (input) => {

    const [line1, line2] = input.split("\n");

    const arrival = parseInt(line1);

    const busses = [];
    line2.split(",").forEach((idstring, index) => {
        if (idstring !== 'x') {
            const id = parseInt(idstring);
            const wait = id - arrival % id;
            busses.push({id, index, wait});
        } 
    });
    
    const earliest = [...busses].sort((a, b) => a.wait - b.wait)[0];
    const result1 = earliest.id * earliest.wait;

    //

    let arrivalBus0 = 0;
    let overallPeriod = busses.shift().id;

    while (busses.length > 0) {

        const {index, id} = busses.shift();

        const periodBusN = id;
        const offsetBusN = index % periodBusN;

        let arrivalBusN = arrivalBus0 - arrivalBus0 % periodBusN + periodBusN;
        while (arrivalBusN !== arrivalBus0 + offsetBusN) {
            arrivalBus0 += overallPeriod;
            arrivalBusN = arrivalBus0 - arrivalBus0 % periodBusN + periodBusN;
        }

        overallPeriod = overallPeriod * periodBusN;
    }

    const result2 = arrivalBus0;

    return [result1, result2];
}

const example =
`939
7,13,x,x,59,x,31,19`;

const challenge =
`1000390
23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,383,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,503,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37`;

console.log(solve(example));
console.log(solve(challenge)); 
