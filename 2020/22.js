const solve = (input) => {

    const players = input.split("\n\n").map((block, index) => {
        const lines = block.split("\n");
        const name = lines.shift().slice(0, -1);
        cards = lines.map(l => parseInt(l)).reverse();
        return {name, cards};
    });

    const getWinner1 = ([p0, p1]) => {
        return p0.played > p1.played ? [p0, p1] : [p1, p0];
    }

    const getWinner2 = (players) => {
        if (players.every(p => p.cards.length >= p.played)) {
            const [winner, looser] = play(players, getWinner2);
            return [winner.origin, looser.origin];
        } else {
            return getWinner1(players);
        }
    }

    let gGame = 1;
    const play = (_players, getWinner) => {
        const players = _players.map(p => {
            const length = p.played === undefined ? p.cards.length : p.played ;
            return {name: p.name, cards: p.cards.slice(-length), origin: p};
        });
        const played = [new Set(), new Set()]; 
        while(1) {
            const s0 = players[0].cards.join(",");
            const s1 = players[1].cards.join(",");
            if (played[0].has(s0) || played[1].has(s1))
                return players;
            played[0].add(s0);
            played[1].add(s1);
            players.forEach(p => p.played = p.cards.pop());
            const [winner, looser] = getWinner(players);
            winner.cards.unshift(winner.played);
            winner.cards.unshift(looser.played);
            if (looser.cards.length === 0) {
                return [winner, looser];
            }
        }
    }

    const score = (cards) => cards.reduce((s, c, i) => s + c * (i + 1), 0); 

    const [winner1] = play(players, getWinner1);
    const result1 = score(winner1.cards); 

    const [winner2] = play(players, getWinner2);
    const result2 = score(winner2.cards);; 

    return [result1, result2];
}

const example = 
`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

const challenge = 
`Player 1:
43
36
13
11
20
25
37
38
4
18
1
8
27
23
7
22
10
5
50
40
45
26
15
32
33

Player 2:
21
29
12
28
46
9
44
6
16
39
19
24
17
14
47
48
42
34
31
3
41
35
2
30
49`;

console.log(solve(example)); 
console.log(solve(challenge)); 
