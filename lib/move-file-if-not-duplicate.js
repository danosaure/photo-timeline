const fs = require('fs');

const debug = require('./debug')('move-file-if-not-duplicate');
const fileChecksum = require('./file-checksum');

module.exports = async (orig, dest) => {
    if (fs.existsSync(dest)) {
        const sizeDest = fs.statSync(dest).size;
        const sizeOrig = fs.statSync(orig).size;
        const sameSize = (sizeDest === sizeOrig);

        const destChecksum = await fileChecksum(dest);
        const origChecksum = await fileChecksum(orig);
        const sameChecksum = (destChecksum === origChecksum);

        if (sameSize && sameChecksum) {
            debug(`exact same file.`);
            fs.unlinkSync(orig);
        } else {
            debug(`--- duplicate: orig=${orig}`);
            debug(`               dest=${dest}`);
            const sizePrefix = (sizeOrig > sizeDest) ? '>>>' : '   ';
            debug(`${sizePrefix} size: orig=${sizeOrig}; dest=${sizeDest}`);
            debug(`    checksum: orig=${origChecksum}; dest=${destChecksum}`);
        }
    } else {
        fs.renameSync(orig, dest);
        // debug(`moved ${orig} to ${dest}.`);
    }
};
