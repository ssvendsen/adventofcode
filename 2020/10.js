const input = 
`152
18
146
22
28
133
114
67
19
37
66
14
90
163
26
149
71
106
46
143
145
12
151
105
58
130
93
49
74
83
129
122
63
134
86
136
166
169
159
3
178
88
103
97
110
53
125
128
9
15
78
1
50
87
56
89
60
139
113
43
36
118
170
96
135
23
144
153
150
142
95
180
35
179
80
13
115
2
171
32
70
6
72
119
29
79
27
47
107
73
162
172
57
40
48
100
64
59
175
104
156
94
77
65`
/*`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`*/.split("\n").map(l => parseInt(l)).sort((a, b) => a - b);

const deltas = [];
input.reduce((prev, jolt) => {
    deltas.push(jolt - prev);
    console.log(jolt - prev);
    return jolt;
}, 0);

// part 1
const s1 = deltas.reduce((sum, delta) => delta === 1 ? sum + 1 : sum)
const s3 = deltas.reduce((sum, delta) => delta === 3 ? sum + 1 : sum)
console.log(s1, s3, s1 * s3);

const sequencesOfOne = {};
const last = deltas.reduce((length, delta) => {
    if (delta === 1) {
        return length + 1; // length of sequence
    }
    if (length > 0) {
        const current = length in sequencesOfOne ? sequencesOfOne[length] : 0;
        sequencesOfOne[length] = current + 1;
        // console.log(length, current +1)
    }
    return 0;
}, 0);
if (last > 0) {
    sequencesOfOne[last]++
} 

const part1 = Object.entries(sequencesOfOne).reduce((sum, [length, count]) => sum + length * count, 0);
// part 1
/*const dJoltCounts = [0, 0, 0, 0];
const dJoltCounts2 = [0, 0, 0, 0];
let p = 1, p2 = 1;
for (let i=0; i < numJolts + 1; i++) {
    const jolt0 = input[i];
    const jolt1 = input[i - 1];
    const jolt2 = input[i - 2];
    const jolt3 = input[i - 3];
    const dJolt1 = input[i] - input[i - 1];
    const dJolt2 = input[i] - input[i - 2];
    const dJolt3 = input[i] - input[i - 3];
    const current = dJoltCounts[dJolt1];
    dJoltCounts[dJolt1] = current + 1;

    if (dJolt2 === 2) {
        p2 *= 2;
    }
    const waysToGetHere = [dJolt1, dJolt2, dJolt3].reduce((count, dJolt) => count += (dJolt <= 3) ? 1 : 0, 0)
    console.log(jolt0, jolt1, jolt2, jolt3, dJolt1, dJolt2, dJolt3, waysToGetHere)
    p *= waysToGetHere; // > 1 ? 2 : 1; //s2**(waysToGetHere-1);

    // const canGetHereFrom2StepsBack =  
}

console.log(dJoltCounts, dJoltCounts[1] * dJoltCounts[3], p, p2)
*/

console.log(sequencesOfOne);

const variants = {1: 1, 2: 2, 3: 4, 4: 7};
console.log(variants);


const bigNumber = Object.entries(sequencesOfOne).reduce((product, [length, count]) => product * (variants[length] ** count), 1);

console.log(bigNumber)
// part 2

