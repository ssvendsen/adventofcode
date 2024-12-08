const solve = (input) => {

    const lines = input.split("\n");
    const line0 = lines[0].split("");

    const height = lines.length;
    const width = line0.length;
    const isWithinBounds = ([x, y]) => x >= 0 && x < width && y >= 0 && y < height;

    const frequencies = new Map();

    lines.forEach((line, y) => {
        line.split("").forEach((freq, x) => {
            if (freq !== '.') {
                const antenna = {x, y, freq};
                if (!frequencies.has(freq)) {
                    frequencies.set(freq, []);
                }
                const antennas = frequencies.get(freq);
                antennas.push(antenna);
            }
        });
    });

    const hotspots1 = new Set();
    const hotspots2 = new Set();

    for (let [freq, antennas] of frequencies) {
        for (let i = 0; i < antennas.length - 1; i++) {
            const antenna1 = antennas[i];
            const {x: x1, y: y1} = antenna1;
            for (let j = i + 1; j < antennas.length; j++) {
                const antenna2 = antennas[j];
                const {x: x2, y: y2} = antenna2;
                const dx = x2 - x1;
                const dy = y2 - y1;

                // part 1
                const hotspotA = [x1 - dx, y1 - dy];
                const hotspotB = [x2 + dx, y2 + dy];
                if (isWithinBounds(hotspotA)) {                
                    hotspots1.add(hotspotA.join());
                }
                if (isWithinBounds(hotspotB)) {                
                    hotspots1.add(hotspotB.join());
                }

                // part 2
                let x = x1;
                let y = y1;
                while (isWithinBounds([x, y])) {
                    hotspots2.add([x, y].join());
                    x -= dx;
                    y -= dy;
                }     
                x = x2;
                y = y2;
                while (isWithinBounds([x, y])) {
                    hotspots2.add([x, y].join());
                    x += dx;
                    y += dy;
                }     
            }
        }
    }
    
    const result1 = hotspots1.size;
    const result2 = hotspots2.size;

    return [result1, result2];
}

const example = 
`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const challenge = 
`..................................D...............
..o.............................D..............b..
.H....o........z...........D......................
.......................Y...O............1.........
......4...............N....................d......
........4......................D..........d.......
.o.............4................1.................
.......................................y.1......w.
..........Y.H..........5.........y.......b........
...Q.....H......Y...............y..m..............
.........Q.Y..............O..................m....
............................N...O.................
....5.............................8...........b...
....H....................................w........
.........................1.....O..y.........d.....
.........................4........................
...............................2..................
........Q...5.....................................
..............0...................................
.....................0...Z...2....................
.....0.........................MZ.m...............
...6........0...........Z.....m..................d
.................................B.E..............
......6...........................................
.......................................8..B.......
..z......5.............................7.....8....
..................................................
......................................2...........
.........Z..6....................q................
..................................................
.......6.................G..7.....................
.......z................I.....b.B...............e.
.........N..............................2...M.....
..G...............................................
...................w...g.....7......E.............
...........................q...n..........M.E.....
........................................I.........
................................W.......7..e......
..........................9....................W..
...............G.3..8..............B.9.......i....
..................................n..............3
....................3................E............
............................3........h..i.........
....................9......hi...............n..M..
..............z..............I....h..............i
..............h............g......................
....................G..............e..............
...............................I............g.....
................q...g..9..........e...W......n....
.......................................W..........`;

console.log("Example", solve(example)); 
console.log("Challenge", solve(challenge)); 