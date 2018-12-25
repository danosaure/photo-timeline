const md5File = require('md5-file');

const debug = require('./debug')('lib/get-set-md5');

module.exports = (filePath) => {
    if (fs.existsSync(`${filePath}.md`)) {
    } else {
    }
};
