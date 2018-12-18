const fs = require('fs');

module.exports = (folder) => {
    if (fs.existsSync(folder)) {
        const stats = fs.statSync(folder);
        if (!stats.isDirectory()) {
            throw new Error(`Expected '${folder}' to be a directory.`);
        }
    } else {
        fs.mkdirSync(folder);
    }
};
