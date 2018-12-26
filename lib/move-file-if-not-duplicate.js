const fs = require('fs');

const debug = require('./debug')('lib/move-file-if-not-duplicate');
const fileChecksum = require('./file-checksum');

module.exports = async (orig, dest) => {
    if (fs.existsSync(dest)) {
        debug(`duplicate: orig=${orig}, dest=${dest}`);

        const sizeDest = fs.statSync(dest).size;
        const sizeOrig = fs.statSync(orig).size;
        debug(`size: orig=${sizeOrig} =?= dest=${sizeDest}`);


        const destChecksum = await fileChecksum(dest);
        const origChecksum = await fileChecksum(orig);
        debug(`    dest checksum=`, destChecksum);
        debug(`    orig checksum=`, origChecksum);
        if (origChecksum === destChecksum) {
        } else {
            debug(`dest2=${dest} exists.`);
        }

    } else {
        fs.renameSync(orig, dest);
        // debug(`moved ${orig} to ${dest}.`);
    }
};
