
const days = 11;
new Array(days).fill().forEach((v, i) => {
    const day = i + 1;
    console.log("Day", day);
    require(`./${day}.js`);
});

