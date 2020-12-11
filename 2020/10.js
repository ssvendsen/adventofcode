const solve = (input) => {

    const joltages = input.split("\n").map(l => parseInt(l)).sort((a, b) => a - b);
    const increments = joltages.map((joltage, i) => joltage - (i > 0 ? joltages[i-1] : 0));
    
    // Part 1
    const oneIncrements = increments.reduce((count, increment) => count + (increment === 1 ? 1 : 0))
    const threeIncrements = increments.reduce((count, increment) => count + (increment === 3 ? 1 : 0))
    
    const task1 = oneIncrements * threeIncrements;
    
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
    
    const permutationsForSeqLengths = {1: 1, 2: 2, 3: 4, 4: 7};
    const totalPermutations = Object.entries(oneIncrSeqLengthDistr).reduce(
        (permutations, [seqLength, count]) => permutations * (permutationsForSeqLengths[seqLength] ** count), 1
    );
    
    const task2 = totalPermutations;    

    return [task1, task2];
};

const example1 = 
`16
10
15
5
1
11
7
19
6
12
4`;

const example2 = 
`28
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
3`;

const challenge = 
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
65`;

console.log(solve(example1)); 
console.log(solve(example2)); 
console.log(solve(challenge)); 
