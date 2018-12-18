const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const constants = require('./constants');
const fileExtension = require('./file-extension');
const processFile = require('./process-file');

let counter = 0;

const processFolder = async (folder) => {
    const items = fs.readdirSync(folder);

    if (constants.MAX_NUMBER_FILES_TO_RENAME !== -1 && counter > constants.MAX_NUMBER_FILES_TO_RENAME) {
        return;
    }

    await Promise.each(items, async (item) => {
        const itemPath = path.join(folder, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            await processFolder(itemPath);
        } else {
            const ext = fileExtension(itemPath);
            if (ext !== 'jpg') {
                return;
            }

            counter += 1;

            if (constants.MAX_NUMBER_FILES_TO_RENAME !== -1 && counter > constants.MAX_NUMBER_FILES_TO_RENAME) {
                return;
            }

            await processFile(itemPath);
        }
    });
};

module.exports = processFolder;
