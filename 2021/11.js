const solve = (input) => {

    const energyLevels = input.replace(/\n/g, "").split("").map(c => parseInt(c));

    const neighbourOffsets = [
        [-1, -1], [ 0, -1], [ 1, -1],
        [-1,  0],           [ 1,  0],
        [-1,  1], [ 0,  1], [ 1,  1],
    ];

    forEachNeighbour = (pos, fn) => {
        const x0 = pos % 10;
        const y0 = (pos - x0) / 10;
        neighbourOffsets.forEach(([dX, dY]) => {
            const x1 = x0 + dX, y1 = y0 + dY;
            if (x1 >= 0 && x1 < 10 && y1 >= 0 && y1 < 10) {
                fn( x1 + y1 * 10);
            }
        });
    }

    const step = (levels) => {
        levels.forEach((_, pos) => levels[pos] += 1);
        const flashed = new Set();
        while (1) {
            const flashing = levels.findIndex((level, i) => level >= 10 && !flashed.has(i));
            if (flashing === -1)
                break;
            flashed.add(flashing);
            forEachNeighbour(flashing, pos => levels[pos] += 1);
        }
        flashed.forEach(i => levels[i] = 0);
        return flashed.size;
    }

    let flashes = 0;
    let steps = 0;

    while (steps++ < 100) {
        flashes += step(energyLevels);
    }

    while (step(energyLevels) !== 100) {
        steps++;
    }

    return [flashes, steps];
}

const example = 
`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const challenge = 
`8826876714
3127787238
8182852861
4655371483
3864551365
1878253581
8317422437
1517254266
2621124761
3473331514`;

console.log("Example", solve(example)); 
console.log("Challenge", solve(challenge)); 
