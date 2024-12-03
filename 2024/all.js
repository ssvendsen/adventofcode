const fs = require('node:fs');
const paths = fs.readdirSync(__dirname);
for (const path of paths) {
    if (path.match(/\d+\.js/)) {
        console.log("Day", path.replace(".js", ""));
        require(`${__dirname}/${path}`);
    }
}

