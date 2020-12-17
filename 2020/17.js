const solve = (input) => {

    // console.log("Hello");

    const makeVectors = (offsets, pos = 0) => {
        if (offsets.length > 0) {
            const [offset, ...next] = offsets;
            return [-1, 0, 1].flatMap(v => makeVectors(next, pos + offset * v));
        } else {
            return pos;
        }
    }

    // The overall idea is to keep track of active cubes in a map.
    // The cube position is encoded in the key. The x coordinate in the lower
    // n bits, y coordinates in the m bits above that etc. Looking up neighbour
    // cubes is a matter of adding the appropriate value to the current key.
    // Those values are called 'vectors' in this code and are calculated up front.
    // There are 26 vectors for 3d and 80 for 4d in order to visit all neighbours.

    const dX = 2 ** 0, dY = 2 ** 10, dZ = 2 ** 20, dW = 2 ** 30, dV = 2 ** 40;
    const vectors3d = makeVectors([dZ, dY, dX]);
    const vectors4d = makeVectors([dW, dZ, dY, dX]);
    vectors3d.splice(13, 1);
    vectors4d.splice((81-1)/2, 1);

    // Populate the initial grid
    const initialGrid = {}
    const initialWidth = input.indexOf("\n") + 1;
    let i = input.indexOf("#");
    while (i >= 0) {
        const x = i % initialWidth;
        const y = (i - x) / initialWidth;
        initialGrid[x * dX + y * dY] = 1;
        i = input.indexOf("#", i + 1);
    }

    // Count active neighbour cells
    const countNeighbours = (grid, pos, vectors) => vectors.reduce((sum, v) => {
        return sum + (grid[pos + v] ? 1 : 0);
    }, 0);

    // Do one game iteration
    const step = (grid, vectors) => {
        const nextGrid = {};
        const visitedCells = {};
        let visitedCount = 0;
        Object.keys(grid).forEach(_pos => {
            const pos = Number(_pos);
            if (!nextGrid[pos]) { // no need to activate twice
                visitedCells[pos] = 1;
                visitedCount++;

                // If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
                const activeNeighbours = countNeighbours(grid, pos, vectors);
                if (activeNeighbours === 2 || activeNeighbours === 3) {
                    nextGrid[pos] = 1;
                }

                // If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
                // We don't track empty cubes so check neighbours of active cells instead. Keep track of visited cells for speed
                vectors.forEach(v => {
                    const neighbourPos = pos + v;
                    if (!visitedCells[neighbourPos]) {
                        visitedCells[neighbourPos] = 1;
                        visitedCount++;

                        const activeNeighboursOfNeighbours = countNeighbours(grid, neighbourPos, vectors);
                        if (!grid[neighbourPos] && activeNeighboursOfNeighbours === 3) {
                            nextGrid[neighbourPos] = 1;
                        }
                    }
                });
            }
        });
        // console.log("Visited", visitedCount, "and counted", visitedCount * vectors.length, "neighbours, new grid has", Object.keys(nextGrid).length, "cells");
        return nextGrid;
    }

    // N game iterations
    const run = (grid, vectors, iterations) => {
        while (iterations--) {
            grid = step(grid, vectors);
        }
        return grid;
    }

    // console.log("Start");
    const finalGrid1 = run(initialGrid, vectors3d, 50);
    const result1 = Object.keys(finalGrid1).length;
    // console.log("First done");
    const finalGrid2 = run(initialGrid, vectors4d, 6);
    const result2 = Object.keys(finalGrid2).length;
    // console.log("Second done");

    let minX = 1000, maxX = 0, minY = 1000, maxY = 0, minZ = 1000, maxZ = 0, minW = 1000, maxW = 0;

    console.log(Object.keys(finalGrid1).length);
    
/*    Object.keys(finalGrid2).forEach(_pos => {
        let pos = Number(_pos);
        pos += (dY + dZ + dW + dV) / 2;
        const w = Math.trunc(pos/dW);
        pos -= w * dW;
        const z = Math.trunc(pos/dZ);
        pos -= z * dZ;
        const y = Math.trunc(pos/dY);
        pos -= y * dY;
        const x = pos;

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        minZ = Math.min(minZ, z);
        minW = Math.min(minW, w);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        maxZ = Math.max(maxZ, z);
        maxW = Math.max(maxW, w);

        console.log(`${x},${y},${z}`);
    });
*/
    // console.log(minX, maxX, minY, maxY, minZ, maxZ, minW, maxW)

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

// console.log(solve(example)); 
// console.log(solve(challenge)); 
solve(challenge)