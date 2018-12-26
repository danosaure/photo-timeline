const md5File = require('md5-file');
const Promise = require('bluebird');

// const debug = require('./debug')('lib/lib-checksum');

const md5 = Promise.promisify(md5File);

module.exports = async (filePath) => {
    // debug(`filePath=${filePath}`);
    try {
        return await md5(filePath);
    } catch (err) {
        console.error(`md5$(${filePath}) err=`, err);
    }

};
