const solve = (input) => {

    const connections = input.split("\n").map(line => line.split("-"));

    const caveConnections = {
        // string[] for connections
    }

    connections.forEach(connection => {
        const [a, b] = connection;
        const aConnections = a in caveConnections ? caveConnections[a] : [];
        aConnections.push(b);
        caveConnections[a] = aConnections;
        const bConnections = b in caveConnections ? caveConnections[b] : [];
        bConnections.push(a);
        caveConnections[b] = bConnections;
    })

    const hasLowercase = new RegExp(/[a-z]/);

    // This ended up pretty weird

    const visit = (cave, pathHere, navigation) => {
        navigation.markVisited(cave);
        const path = [...pathHere, cave];
        if (cave === "end") {
            navigation.regsterPath(path);
        } else {
            caveConnections[cave].forEach(nextCave => {
                if (navigation.shouldVisit(nextCave)) {
                    visit(nextCave, path, navigation.continue());
                }
            })
        }
    }

    class NavigationStrategy1 {
        constructor(visited = new Set(), paths = []) {
            this.visitedCaves = visited;
            this.paths = paths;
        }
        markVisited(cave) {
            this.visitedCaves.add(cave);
        }
        shouldVisit(cave) {
            const isBigCave = !hasLowercase.test(cave);
            const isCaveUnvisited = !this.visitedCaves.has(cave);
            return isBigCave || isCaveUnvisited;
        }
        continue() {
            return new NavigationStrategy1(new Set(this.visitedCaves), this.paths);
        }
        regsterPath(path) {
            this.paths.push(path);
        }
    }

    const strategy1 = new NavigationStrategy1();
    visit("start", [], strategy1);
    const result1 = strategy1.paths.length;

    class NavigationStrategy2 extends NavigationStrategy1 {
        markVisited(cave) {
            const isAlreadyVisited = this.visitedCaves.has(cave);
            super.markVisited(cave);
            const isSmallCave = hasLowercase.test(cave);
            if (isSmallCave && isAlreadyVisited) {
                super.markVisited("_smallCaveRevisited");
            }
        }
        shouldVisit(cave) {
            const isStart = cave === "start";
            const isAnySmallCaveVisitedTwice = this.visitedCaves.has("_smallCaveRevisited");
            return super.shouldVisit(cave) || !(isAnySmallCaveVisitedTwice || isStart);
        }
        continue() {
            return new NavigationStrategy2(new Set(this.visitedCaves), this.paths);
        }
    }

    const strategy2 = new NavigationStrategy2();
    visit("start", [], strategy2);
    const result2 = strategy2.paths.length;

    return [result1, result2];
}

const example = 
`start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const example2 = 
`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

const challenge = 
`start-kc
pd-NV
start-zw
UI-pd
HK-end
UI-kc
pd-ih
ih-end
start-UI
kc-zw
end-ks
MF-mq
HK-zw
LF-ks
HK-kc
ih-HK
kc-pd
ks-pd
MF-pd
UI-zw
ih-NV
ks-HK
MF-kc
zw-NV
NV-ks`;

console.log(solve(example)); 
console.log(solve(example2)); 
console.log(solve(challenge)); 
