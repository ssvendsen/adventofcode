const solve = (input) => {

    const ages = input.split(",").map(n => parseInt(n));

    const incrementAgeCount = (ageMap, age, increment = 1) => {
        const currentCount = ageMap.has(age) ? ageMap.get(age) : 0;
        ageMap.set(age, currentCount + increment);
        return ageMap;
    }

    const nextFrom = (age) => (
        age > 0 ? [age - 1] : [6, 8]
    );
    
    const stepAgeMap = (ageMap) => {
        const nextAgeMap = new Map();
        ageMap.forEach((count, age) => {
            nextFrom(age).forEach(nextAge => {
                incrementAgeCount(nextAgeMap, nextAge, count);
            })
        })
        return nextAgeMap;
    };

    const run = (state, stepFn, iterations) => {
        while (iterations-- > 0) {
            state = stepFn(state);
        }
        return state;
    }

    const countAges = (ageMap) => (
        [...ageMap].reduce((acc, [age, count]) => acc + count, 0)
    );

    const initialAgeMap = ages.reduce((map, age) => incrementAgeCount(map, age), new Map());

    const result1 = countAges(run(initialAgeMap, stepAgeMap, 80));
    const result2 = countAges(run(initialAgeMap, stepAgeMap, 256));

    return [result1, result2];
}

const example = 
`3,4,3,1,2`;

const challenge = 
`2,1,1,1,1,1,1,5,1,1,1,1,5,1,1,3,5,1,1,3,1,1,3,1,4,4,4,5,1,1,1,3,1,3,1,1,2,2,1,1,1,5,1,1,1,5,2,5,1,1,2,1,3,3,5,1,1,4,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,4,1,5,1,2,1,1,1,1,5,1,1,1,1,1,5,1,1,1,4,5,1,1,3,4,1,1,1,3,5,1,1,1,2,1,1,4,1,4,1,2,1,1,2,1,5,1,1,1,5,1,2,2,1,1,1,5,1,2,3,1,1,1,5,3,2,1,1,3,1,1,3,1,3,1,1,1,5,1,1,1,1,1,1,1,3,1,1,1,1,3,1,1,4,1,1,3,2,1,2,1,1,2,2,1,2,1,1,1,4,1,2,4,1,1,4,4,1,1,1,1,1,4,1,1,1,2,1,1,2,1,5,1,1,1,1,1,5,1,3,1,1,2,3,4,4,1,1,1,3,2,4,4,1,1,3,5,1,1,1,1,4,1,1,1,1,1,5,3,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,4,4,1,1,1,1,1,1,1,1,3,1,3,1,4,1,1,2,2,2,1,1,2,1,1`;

console.log("Example", solve(example)); 
console.log("Challenge", solve(challenge)); 
