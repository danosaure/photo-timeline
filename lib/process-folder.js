const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const constants = require('./constants');
const debug = require('./debug')('lib/process-folder');
const fileExtension = require('./file-extension');
const processFile = require('./process-file');

let counter = 0;

const processFolder = async (source, dest, limit) => {
    // debug(`source=${source}, dest=${dest}, limit=${limit}`);

    const items = fs.readdirSync(source);

    if (limit !== -1 && counter > limit) {
        return;
    }

    await Promise.each(items, async (item) => {
        const itemPath = path.join(source, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            await processFolder(itemPath, dest, limit);
        } else {
            const ext = fileExtension(itemPath);
            if (ext !== 'jpg') {
                return;
            }

            counter += 1;

            if (limit !== -1 && counter > limit) {
                return;
            }

            await processFile(itemPath, dest);
        }
    });
};

module.exports = processFolder;
