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
65`.split("\n");

const joltages = input.map(l => parseInt(l)).sort((a, b) => a - b);
const increments = joltages.map((joltage, i) => joltage - (i > 0 ? joltages[i-1] : 0));

// Part 1
const oneIncrements = increments.reduce((count, increment) => count + (increment === 1 ? 1 : 0))
const threeIncrements = increments.reduce((count, increment) => count + (increment === 3 ? 1 : 0))

console.log(oneIncrements * threeIncrements);

// Part 2
const oneIncrSeqLengthDistr = {};
const lastOneIncrSeqLength = increments.reduce((seqLength, increment) => {
    if (increment === 1) {
        return seqLength + 1; // length of current sequence
    }
    if (seqLength > 0) {
        const currentLength = oneIncrSeqLengthDistr[seqLength] || 0;
        oneIncrSeqLengthDistr[seqLength] = currentLength + 1;
    }
    return 0; // reset sequence length
}, 0);

if (lastOneIncrSeqLength > 0) {
    oneIncrSeqLengthDistr[lastOneIncrSeqLength]++
} 

const variantsForLengths = {1: 1, 2: 2, 3: 4, 4: 7};
const permutations = Object.entries(oneIncrSeqLengthDistr).reduce((product, [length, count]) => product * (variantsForLengths[length] ** count), 1);

console.log(permutations)

