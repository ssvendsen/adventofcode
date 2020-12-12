
const day = 12;
new Array(12).fill(0).forEach((v, i) => {
    const day = i + 1;
    console.log("Day", day);
    require(`./${day}.js`);
});

