
const days = 25;
new Array(days).fill().forEach((v, i) => {
    const day = i + 1;
    console.log("Day", day);
    require(`./${day}.js`);
});

