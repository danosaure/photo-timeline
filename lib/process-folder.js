const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const processFile = require('./process-file');

const processFolder = async (folder) => {
    const items = fs.readdirSync(folder);

    await Promise.each(items, async (item) => {
        const itemPath = path.join(folder, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            await processFolder(itemPath);
        } else {
            await processFile(itemPath);
        }
    });
};

module.exports = processFolder;
