const fs = require('fs');

const debug = require('./debug')('lib/move-file-if-not-duplicate');

module.exports = (orig, dest) => {
    if (fs.existsSync(dest)) {
        debug(`dest=${dest} exists.`);
    } else {
        fs.renameSync(orig, dest);
        // debug(`moved ${orig} to ${dest}.`);
    }
};
