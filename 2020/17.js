const solve = (input) => {

    const makeVectors = (offsets, pos = 0) => {
        if (offsets.length > 0) {
            const [offset, ...next] = offsets;
            return [-1, 0, 1].flatMap(v => makeVectors(next, pos + offset * v));
        } else {
            return pos;
        }
    }

    // Keep vectors keeping the distance to neighbours in a flattened space
    const vX = 2 ** 0, vY = 2 ** 10, vZ = 2 ** 20, vW = 2 ** 30;
    const vectors3d = makeVectors([vZ, vY, vX]);
    const vectors4d = makeVectors([vW, vZ, vY, vX]);
    vectors3d.splice(13, 1);
    vectors4d.splice((81-1)/2, 1);

    // Keep track of active cells using maps for each iteration 
    const initialGrid = {}
    const initialWidth = input.indexOf("\n") + 1;
    let p = input.indexOf("#");
    while (p >= 0) {
        const x = p % initialWidth;
        const y = (p - x) / initialWidth;
        initialGrid[x * vX + y * vY] = 1;
        p = input.indexOf("#", p + 1);
    }

    // Count the active neighbours given current grid, position and neighbour vectors
    const countNeighbours = (grid, pos, vectors) => vectors.reduce((sum, v) => {
        return sum + (grid[pos + v] ? 1 : 0);
    }, 0);

    // Do one iteration
    const step = (grid, vectors) => {
        const nextGrid = {};
        Object.keys(grid).forEach(_pos => {
            const pos = Number(_pos);

            // If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
            const neighbours = countNeighbours(grid, pos, vectors);
            if (neighbours === 2 || neighbours === 3) {
                nextGrid[pos] = 1;
            }

            // If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
            // (since we don't track empty cubes explicitly, look nearby populated ones)
            vectors.forEach(v => {
                const pos2 = pos + v;
                const neighbours2 = countNeighbours(grid, pos2, vectors);
                if (!grid[pos2] && neighbours2 === 3) {
                    nextGrid[pos2] = 1;
                }
            });
        });
        return nextGrid;
    }

    // Do n iterations
    const run = (grid, vectors, iterations) => {
        while (iterations--) {
            grid = step(grid, vectors);
        }
        return grid;
    }

    const finalGrid1 = run(initialGrid, vectors3d, 6);
    const result1 = Object.keys(finalGrid1).length;

    const finalGrid2 = run(initialGrid, vectors4d, 6);
    const result2 = Object.keys(finalGrid2).length;

    return [result1, result2];
}

const example = 
`.#.
..#
###`;

const challenge = 
`##.#####
#.##..#.
.##...##
###.#...
.#######
##....##
###.###.
.#.#.#..`;

console.log(solve(example)); 
console.log(solve(challenge)); 
