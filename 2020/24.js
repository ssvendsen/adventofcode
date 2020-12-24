const solve = (input) => {

    const lines = input.split("\n");

    const directions = ["e", "se", "sw", "w", "nw", "ne"];

    // https://en.wikipedia.org/wiki/Hexagonal_tiling#Topologically_equivalent_tilings
    const vectors = {e: [1, 0], se: [0, 1], sw: [-1, 1], w: [-1, 0], nw: [0, -1], ne: [1, -1]};

    const addV = (v0, v1) => [v0[0] + v1[0], v0[1] + v1[1]];
    const cmpV = (v0, v1) => v0[0] - v1[0] === 0 && v0[1] - v1[1] === 0;

    const nullV = [0, 0];
    const sumSteps = (steps) => steps.reduce((sum, d) => addV(sum, vectors[d]), nullV)

    // Quick sanity check
    if (!cmpV(sumSteps(directions), nullV))
        throw "vectors sum should be 0 vector";

    const toId = (v) => `${v[0]},${v[1]}`;            
    const fromId = (id) => id.split(",").map(n => parseInt(n));

    // Part 1

    const init = (lines) => {
        const blackTiles = new Set();
        lines.forEach(line => {
            const steps = line.match(/(e|se|sw|w|nw|ne)/g);
            const dest = sumSteps(steps);
            const id = toId(dest);            
            if (blackTiles.has(id)) {
                blackTiles.delete(id);
            } else {
                blackTiles.add(id);
            }
        });
        return blackTiles;
    }

    const initialLayout = init(lines);
    const result1 = initialLayout.size;

    // Part 2

    const step = (blackTiles) => {
        const next = new Set();
        const visitedWhite = new Set();
        // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
        // Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
        // (Consider tile locations adjacent to black tiles only)
        blackTiles.forEach(id0 => {
            const v0 = fromId(id0);
            const blackCount1 = directions.reduce((c, d1) => {
                const v1 = addV(v0, vectors[d1]);
                const id1 = toId(v1);
                const isBlack1 = blackTiles.has(id1);
                // Deal with the white tiles
                if (!isBlack1 && !visitedWhite.has(id1)) { 
                    const blackCount2 = directions.reduce((d, d2) => {
                        const v2 = addV(v1, vectors[d2]);
                        const isBlack2 = blackTiles.has(toId(v2));
                        return isBlack2 ? d + 1 : d;
                    }, 0);
                    if (blackCount2 === 2) {
                        next.add(id1);
                    }
                    visitedWhite.add(id1);
                }
                return isBlack1 ? c + 1: c
            }, 0);
            if (! (blackCount1 === 0 || blackCount1 > 2)) {
                next.add(id0);
            }
        });
        return next;
    }

    let nextLayout = initialLayout;
    let steps = 100;
    while (steps--) {
        nextLayout = step(nextLayout);
    }

    const result2 = nextLayout.size;

    return [result1, result2];
}

const example = 
`sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;

const challenge = 
`nenwenwneeneswwnewnwswnwneneenwnenene
eseseseswneseenweeeeeenweseewe
senwneswenesenewnwswswne
swseseseseeseseseneseewnwsewsesesenwe
nwwwswwswseswswseswswsenenwsenww
nwnwswnenwnwneneseseseswnwnwwsenwnwswenw
eeneeeeswenwneswseeeenwnwneewnene
nwneneswneneneneenwneneneneswsenenwnwnewe
sesesesweweswswswseswswesesewseswwne
nwnwnenwsewswnwnenwnwnwwnwnwnenwnwnwsese
swswseseswswswswswnwswseswneswswnesene
nenenenesenenenwneneswneneswnwnenwnwne
eneeneeneeswneneneeeneseeenwnew
eneeseeeeeseeswenesewe
nenwnenwnwnwenwswswnenwneenenenenenwnw
wnenwseneneswnwenwnw
nenweeeweweesesweeeeswneeee
sesenesesewesesesweeweseneseseee
enwnwwnwnwnwnwswnwenwnwnwnwwnwnwnwe
nenwswwewnwswswweswswseswwswwwswsw
esewnenesenewwswseswesesewneseswse
seseweseeeeeseese
neswswswsesesenweswswswswsewnwwneneswse
eeeswnwwswenwenenwenweseeneswe
nwseneenweesenwseeswenenewswwsew
seswnwswsesweseseseswswsene
swnwseseeenwnwenwswswseseeseswseseese
wnwnenwnewnenwsenwnwnwnewnenwneenese
senenwnwswswenwswswwswswse
wseeseseewseseseseseseeseswseenwnese
neenwnenenenenwesesw
wswswwswesweswswwswneswswneswwswsw
nweseseeseswsesesewesenweese
nenenenewnenweewenewneneswswnenenwsw
neeneenenenesenwseneneweneenewnene
eeneeswnwsesweeeeenenweeswse
wswswswswswswnwswswneswswswwswneseswse
swwneswswsenwswseswseseswsenenenenenwswe
neneenenewenewnenewsenesenenenenenenww
nwseswswswswseswswswswswswse
neneseeseseswwseesenwnwseseswwnesee
wswsweswwwnwswwewwswwnwwwsenwwsw
swnenesenewenenenenw
eneesenewseseneeseseseseseswseseswse
neeeeeeweeeeseewnweeswee
wnwenwswnwnwenwenwswsewnwnwnwwnwnwnw
nwseswswnwseseswenwseneenwenwswseseseswe
nwwnwenwnwnwnwnwnwnwnw
nenwneenwswswweweneeswnwneneswenene
newwnewswweewwwwseswwewwnw
eseewseseeseeeeesee
senwnwseseeseseneneseeeesweeeewesw
wwwwwwewwwwwwwnwe
neseneneneneneewneeneneneeeswenenw
swnwenwnwswnwnwnwnwenwwnwenwnwwnwwnwnw
seeneeeeeeneeeeenwnene
seeswnenenweseewsenwnwneeeeenew
eswswwwnewsweneneswwswswwseneswwne
nwwswnwswenwneenwnwnwnwnwnwnwnwnwnenene
wswwswwseswwsewwwnewwenewswnew
swseenwnwnwnwwswnwnenenwnwnw
swwswwwneseseseeseswweeeewwne
wwwsewswwenwnwsenwwswseneenwnene
swswsesweswnwswweneswswswwswswwswsw
swswswswsesenwswwnenwswseswseswwswswswnesw
eneseewseesweeeeseweseweeee
nwneseenewneenenee
seewnweeswnenenwneenenesewnesenewse
wesenenewwnewseeeswswswswnewwew
swswnweneswswsewnweesenwsesenwseneww
nenwswnwnwnwswswnwnwnwnwnwnwnwneswnwnwnee
nesenwnwnwnewnwwwswnwswenwnwnwnwswnw
swswneswwswswwwswswswnwswswseswsw
neneneneseswneneenwnwwneswesenenenene
eeseeeseweswsenwwnesenenwwsesesww
eswesweseewenweeenesenweeene
nenwewnwnwnwwnwweseswnwenwnwswnwnw
swnweswnwsweseseswseeseswnwnwseswneswsw
wseswnwnesewsenwseseswnwseneseswsenwsee
wswsweswswseswnesweenwweswnwneswswswsw
neeswsweneswwswswnwswwswneswswswswswsw
swswnwswwwswswewwswswnwewswwswsew
wnwnenwnwnwnwnwsesenwnwnwnenw
esweesewwswnewswwnenesw
nwnwnenwnwnenesenwnenewseneneneswnwnenw
nwswneswsweneseswnwneweneseeeseseew
wwwwnwswwnwwnwnwswewnwwwwne
nenwneseenenesenwwnwnewwnenwnwnwnenwnwne
nwnwwsenwenwsenwnwnwenwnwnweswwnwswnwnw
nwnwwnenwnwnwnwnwnwsesenwnenwnwsenwwnwnwne
esesweswnwseswswswseswseeswnewwsew
nwnwesenwsewswsesewsesenweseeseswse
swwswswswswwswneneswswswwseswwswnew
neneswwnwneswweneneenweeneswsweswne
sewseseweseseseneeeeseeseewsesee
sesesenwnesesesesenewseswsesewne
wweeeeneesenweseeseeseeesesee
eseewesweeenwnwenwswnewswenee
nenweeswwenesenesenenwnewswwesw
nwwwnwnwesewsenwnwnwenwnwwnwnwww
eweneeseseneeswnweeseeewewse
sesenenenwwweneeeeweneeeeene
seswsesesesesenwseeseeseesesenwswnwse
wnwwswswwnewwwwewwwwsewwnenesw
wneneswenewswswnenenwnenweene
senwnwnewseswwsesenwnwnwwwneenenwwwnw
wwwwwnwwwwswwweewwwwneseww
wseswnwnwnwnenwwewnwswwenwseewe
neseswswnweenwnwswseswwnwseswwenesese
neneswnenenwneswnwnwnenenweneneneenenw
eswnwswswwswswswswswswsesweewnwswsww
ewwsewwwwwwnewsewnewnewswww
wswnwwneswswnwwwswnwwesweseeewnwsw
neenwnwnenwswwnwnenwnwsenenww
wwnwnwnwnwwenesewsewwwwwnwnwww
wnenwsweeeeeesweeeswnwneewee
swswwswewwwwwnww
neeseneenewnenenee
swseeneeeeenweeswswnwswnesweenese
seweeeeweeeweeeeeneeneee
neseseenewseswseswsesesesenesenwnwswsese
nenwnwwwnwwnwwnwsewwwnwsenwnwenwene
nwwnwnwsenwwnenwsenwnwswne
wwewswsewwseenenewwwwwswsww
wseesewwwenwesesesenwseeseswneeee
wnwnwswnenwwswwneneswnwwwwnwsewnw
nwsewseneseseseeesenwnwseswseeseneese
swsenwnwneseswswswswwswnweswswwne
neneseneneneenenwswswnenwseenenwwnwesw
neeseweeseeneneneeneeweenenene
nwnenwnwnenwnwneswnwnwnenwnenenw
swsenesweswswswwwwweswnwswnwswsww
seeeseesewswnesesweneeeeesesesenwe
neeeweeneneeeeeeene
nwnwnewsesenenewnesewwneswnwwwswsw
neenwenenwneseneswnesenw
ewswneneenwnenenewnweswneneneesee
swswnewwswwwnwseswswneewswswwswsw
sewsenweseeeseseseseseseeseenwene
ewswwsenewnewswnwwwseseneswnesw
swswswenwseswwnewwsewnenewwswnwseew
nwwnwnwnwenweewswnwwnwneswswwsenesw
nwnwwseewnewnewwnwwweswsenwww
nenweeeneswneswnwswneneneeswenenwswne
swwewswswseswwnewnwswswwswnenwswsww
senwnwnwwwewwnwsenwwnwnwswnwwnwnw
wwswwwweewwswwswswwnwwww
neeswwswswswwwswswswsewsww
swsenwnwnwnwwwnwneeswwwene
newwneeneswsenwewwsenenwnenwswenwsene
sesesenesesewnwnwnesesesenwnwwsenwsenw
wnesenwnwnewewswsewewenwwwese
nenwenwneeneneeneseewneeweesese
enwneweeeseeeeneeseeesweenwe
esweweneeweneesew
senwnweswwswnewse
swsesenewnewswswseswsenwseswseseneswse
eeenwnwewnwseseswneswsesweeneswne
sewwnenwseweneeseneewswneswseesew
swswwsweswnewweswswweswwsw
swnwswwseeweenwsenwseswneenweneneene
swwnwwwswnesewnesenwwenwnwwnwwnesww
nenewseneneenenenweswenwneeeneene
nwnwnenwwwnwnwenwewewnenenwnwsenw
nenwswswswseseswewnwneswswseswseseeneswsw
swswswswswswswswswwwswnwnewsweswnew
neswnwenwneswnwnwnenwnwnene
neswenenenwnenenenenwnwnenenwne
nweswseswswswswwsweswwswswwneneswsww
nesenenewwseswwnenwnwnwese
swneneneeeseeeenwnenwneeeeswsenw
seseswwswswswswswne
neneneswsweneneneneneseenewnwe
nweeesweenweeeeeeeeweeese
wewseenwswswswsenwswswse
neeeneneesenenenenwswseewewnenene
wnwnwnenwnwnwnwnwnenenwe
nwneneneneneeswnenene
nwnwnwnesenenenwwnenenwnwnwse
esweeneeneeee
swswswswswswswneswswswswswswsw
neeseneeneneewnwneneseewnesenenene
nenenesewneneenesenenenenenewnwnene
wswseswwwwswwwswwwswnesewnewsw
seneewenwwwwwwwwwwnwwwwnw
swseswswswswwwneswswswswnwswseswswsw
wenesweneeneenenwesewse
eseseweseeeswsweseeeseneseenesenw
wesenenwwnweewsenwwswwwenweswnw
sesewnwneenewswseseseenwswwswneswsee
nwnwnwnwswnwseswnenenwnwnwswnwnwnee
swseswneswswwwswnwswswneswnwswswseswswsw
swseswseswneneseseseseseenwsesesewww
senwswseswnwesenwew
wswnwswswswseswneswswswswseswsweswsese
sesesenwenesesesewswswnwseseswseesese
wneneneeeneneneweneeseseeeweene
swneswnenwseseneswsewswswsese
seseswseesesewewseseseswseseseewsw
eneseneseeseeseseswsewsesweenwseeswse
nwwnwenwwswnwwsenwswwnwnwnwseeswwese
nwswnwewnwnwnwwww
nwswswwnwswswsweswseswseswswswwswne
weswswswswswswswswswswsesw
neneneenesenenenewnenenenweneseswwnenene
swseseswswswswseseswswswswsesenwnwsw
neneneneneeneneneswneeenesenwnenwsenenw
esewnwnenenwnwnwnwnwnwsenwenenewnwnene
nenenwneenesewneneswseenwnwswnenenw
seneesewseseeseeenweneeeeweswnew
nwnesenwenenwnwnwnwwnw
swneswswwnweewnwseneeswnwwewene
swnwswwwswwwwenwnewswswswwswesesw
nwnwneenenenenenewnenesesenene
nwwsewsenwnwwnwwwwnwnenwne
eseeesesesenwseseewse
wnweswseneneeneneneseneneswnewenesw
eeneeeeeeeeenwneeswe
swneewwenwsenwsewswwnwwnwewswwsw
sewswnesweneseswwnwwswsenese
sesewswnwneswwenwswwnwnwewswnesew
wwnwswswnesewewwwwwwneswsewswsw
eseseseseeseseseeseenwwseseseswnwnesese
neeenwswnwweneeneeneseneswneeneenee
wnesesewswseswsweswnwsesewewneneenwsw
wneenenenwneneneneneswwnesenenenenwswne
weeseenweeneeeeseswneneneewenwe
newneneeneseneenenewneseneeneneww
neeneswseeeesenweeeeenwseseeew
seswswseseeseswnwswsesesweswswswswnww
swswswswseneswnweswswswswwseswswswswswswne
newneenwnenenenenenenenenenene
nenwwwnwnwnwneswneneenwnwnenenwesenwne
esenenenenenewnweneneneneneneswnwneene
swnwewswwwswswwwnewwswwnesewew
eeeseeseeeweeseneeeeseenew
swwwenenwsweseswwseseseswswseew
neesenwnenwswseee
neneswswnwenenenenweswsenenenwneswnwese
neneneeneswneneneseswneewnwnewenesee
newseswswneswsenesewswseseenesewsese
swseewwswwwnwwewwswsweneswsww
wwnwewnwnwnwnwnwswwnwwwsenwsenwnww
eseswseswnwsewneseseswswswwwswswnwswne
wnwnwwnwnwwnesewsewnwwewnwsewsww
seswswnwseswswswswswseneneswswwswseswswsw
seseseeseseswneneewsewse
swswsenwswswseswswsewswseseeenesesw
nweneneeeseseeswswesweeeswnewese
nenwnwwnwnwsenwwnwnenwseswnwnwwnwnwnw
swwswswsenwsewwwswswne
nwsewsesewnenwnewnwnweenewwneee
neneswnenwenewneneneneneswsewsene
wswswswswwsenwswseseswswseneswsesesene
seswswswwenenesweswswseswnwseswswnwsesw
swnwnewswswnwswswswswwseswswswswswsew
eeeneeeeneneenenweswnene
wwwwsenewneneswsewswwwwwwnww
wswwwwwewnwwwwweswnwneseesww
nenwenenwweswwwwswwswswswswesww
nwnesweeeesweeeenwewnweeeswsw
ewwsenwnwsenwnesenenwwseneesw
seeneneneneenenenenenenenwne
senwswswswswnwswswswswswseswswenenwswse
neenenweewnwneseeneneseseneeeswee
nwwswwnwesenwenwwnwnwnwnwswnwseseesw
weswnwswwswswsenwswswswwsw
wswswnwswsweeswswswswswweswswsw
seseenwnwnwesweesweneeeneeeeee
sewweswnwwswswwswswnwseswenewwwnw
nweneewenesweweseseeseeweee
sewseeseseeeseenwsenwseseseenesesw
enwnwnenwnesewnwnwenwswwnwnwnwwnwwnw
swsenwnwseeseswnweeweswenwenesee
eswnwnwnenwenwwse
sewswnenwsenwnwwnwnenwnenwseswwnwsewnw
wnwswwnenesweswwwwwwwewwwseww
wnwnwswwnesenwenwswwewnwnwnwwnww
nwnwseseenwnenenenenenwnewnenw
sesweseneswwswseswseswsesesesesenwnesesw
sewsenwswwneseseneeseneenenwswwnwe
nwwnwnenwwenwewneesewwnwenwnenwnw
nwwwenwswsenwneseneeenewswswwww
ewwnewwwwwswswwwwswww
senewwnwwewswwsenenwwwwwsesenw
sesenewsesweswseswseswnwnwseswswswsenese
neeseneswnenenwnesenenenenenwwwnenese
nwsenenwnenenenwnenewneseweswnenenenenese
swswseseswseswnwweswwseeseseswseswse
wswwnewwseewwswwwwswswwwneww
seewnewsesenwenwwenwseseeesweewnw
newseswsenwseesewesenewsese
seswnesenwnwnwnwsesewnwnwsenenenenwnwnew
nenwnwnenwseesenewswnwneneswnwswenwnwe
swswswnwseeswweswswswswswsewneswswswse
swswswswswnwwswswswswweswwwsweswne
seeseseswwsenwswseneeswseseseswnwsese
nenenwnenenenewneneneseneenenene
ewsewnwwwnwwewwwwsewnwneswnwse
eeeneeeneeeeeenenewne
seewwsewwwnwsewnenewewnweww
nwnwneneswsewnwnwnenwsenw
nwwseseswesewnwnwnenweswnwne
neswswswswswwneeswseswwneswswse
swswswswswwswswswneswseeneseswneswwsw
senenwseeswnenwnwswewswenwwnwswnwnw
neneseswneswneswneenwnenwse
seseseneseweneweeeeseseseseseee
nwnwwenwnwwwnwseswnwsenwswenesenwsenwnw
eswnwnenwnwnwwenene
sewseneseenwseseseeeeee
swnwwnwnwenwnwnwnwswwnwewwwnwnww
swwneswnwswwswwwneewwwnewwwwse
nenwseeseswseeseseswwsewsesesesesenw
swwneswswnwneswsenwsewseseeswneseswese
senwswswswwwnweswsewnwseseseneneneswse
enwseseswnwnwsweeesewnewswwseeesw
weneneeswseswnewnwseseeswswsewwwne
enenewswsenwseseseseseswseswseswswsenww
swswswwswnwwswweswwswwewswww
enewneeeseenwseneneene
swseswnwseseseeseswswnesewseseswnwsesesese
sesesesewewsesewsesesesesesenesesesenese
nenwenwnwnenwswwnwsenwwnwnwnwenwnwnwnw
seseswnwnwswswseseeseswsesenenwseswsesesese
enenweenwseswwesenesewneswwsweenwe
nenenenwneneneswenenenwne
nenesesewswswseseswswseswse
wwwnwnwewwswwwwsenwwsene
wswwnwenewnwwwsenwswsenewwwwnee
swnenwnenenwnenenenwnwnene
neneswswnwnwwnenenenenwnwneneeenenwne
seneswseswewswnesesesesenwseswsewsesese
wsewwnwnwnwnwwwwseswnesenwsenwnenwnw
ewnwsewnwwnwwsenwnwsenwnwnenwneesenw
esesesesesesenwseseseesenwseseseswesw
wswwwnweewwwnewwswnwswswseww
eeenwseeeeseeeswswesewnenese
eseswswswwswnewswseswseseeswwswswnesw
neseeneneeneeneneenwseneenw
neneneneeneewnwwneneeswnenenenenenew
wwwnwwewwwwwwwnwwwewewse
eseeneeenweenesw
esweseseswseswnwseswswswswneswswneswnw
swswswneewnesenwesenwwswnenenweee
neneeenwswnenenwneeneneneeneswnenee
nesenenwwwweswewwse
neesenwseseswsesesesenwswsewseseseseseswe
nwnenenwneseneswnwneseneneneesenenenwne
eseesesesesewseseese
nwnesenwnenwnwnwnwnwswese
swseswneswwneswswsese
senwwswwswwnewnewswsenwnesewnesee
wswwnwwnwswwsewewsewww
nwswnwnesenwwnwnwnewenwwnwnwwwnwnw
nweesweenwnweswseeeeeenwesenenee
wnwsewewwwenwwswenwnwwwnwnesw
swneswesesenenewneswwswswsesenwnwnesee
swseswswesewswseneswswnwswswseswsesenese
nwnwnesewnenwnesenenenwsewnenenenewnese
wewwwswwswwwnwnwwewwwsww
eeenenwswwsesenwsenwneswewseesewswe
swsenwsesweenwesesesesewnwsenwsesesesw
eenenweneeeneneneneeneneswsewee
esenwswsewweseswsenwneseseseseesesee
sesenwswsesenewswsweneeswenwnwsenee
nwnwenwnwwsenwnwnwseewnwnenwnwnwnwnw
neswseneswnwnwsenwnenwesenesewnwnwwwswe
eseeeweseeswneseseeeeseee
nwneneenwnenwnewnwnesenwesenwswwnenenew
wnesesenwwnewswwwseswnewsewnesewww
nwnwnwwnwnwenwnwsewnwnenwsenwnwnwnwwnw
seswseseneswneswnwswswswseswswswswswew
eeneseseenweseseswsesenesewseewse
enwnwwenenenwsewwwswwnwnwwswnwww
nwwnwnwnwnwwsenwnenwwnwnwewwwsenw
sewnenwweeenweseswnwnwsesese
wnwnwnwwnwswswwsenwnenenenwsenwnwsenw
sesewsewsesesenesesesenweenwsesesesee
nwnenwswswwweswewswwswwswswswseswwne
esewneeseenewewneenwnenenenesew
neeeswenwwwwwwnwwnwwweeswwse
wseneswseeewnwwwwne
nwsesenwseseswesesewseswneeneswswsww
swswswseswesesewswswswsw
eenenenenewswneneneneeenewenwseee
swnwseswsenwneeswswswwswswnwswenweenw
wnwswwwswsweeneswwswswwwswsenwse
wswnwnwsesweswwwwweswswwswe
sewsewewwswswswnwnewnwswnewswwsw
wswseeenenewswswswnwswwneneneseswneene
swwnewswswswwwwswnwswswswweswwse`;

console.log(solve(example)); 
console.log(solve(challenge)); 
