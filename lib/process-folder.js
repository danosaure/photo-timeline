const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const constants = require('./constants');
const CounterError = require('./counter/error');
const debug = require('./debug')('process-folder');
const fileExtension = require('./file-extension');
const processFile = require('./process-file');

let counter = 0;
const cachedExt = {};
const IGNORED_EXT = [
    'rar',
    'psd',
    'zip',
];

const processFolder = async (source, dest, limit, fileTypes) => {
    // debug(`source=${source}, dest=${dest}, limit=${limit}, fileTypes=`, fileTypes);

    const items = fs.readdirSync(source);

    if (limit !== -1 && counter > limit) {
        return;
    }

    await Promise.each(items, async (item) => {
        const itemPath = path.join(source, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            await processFolder(itemPath, dest, limit, fileTypes);

            const subItems = fs.readdirSync(itemPath);
            if (subItems.length === 0) {
                fs.rmdirSync(itemPath);
            }
        } else {
            const ext = fileExtension(itemPath);
            // debug(`ext=${ext}`);

            if (IGNORED_EXT.indexOf(ext) !== -1) {
                return;
            }

            try {
                if ((ext === 'jpg' || ext === 'jpeg') && (fileTypes.jpg || fileTypes.any)) {
                    await processFile.jpg(itemPath, dest, ext, limit);
                } else if (ext === 'cr2' && (fileTypes.cr2 || fileTypes.any)) {
                    await processFile.cr2(itemPath, dest, ext, limit);
                } else if (ext === 'mov' && (fileTypes.mov || fileTypes.any)) {
                    await processFile.mov(itemPath, dest, ext, limit);
                } else {
                    if (! cachedExt[ext]) {
                        debug(`Unprocessed ext=${ext}.`);
                        cachedExt[ext] = 1;
                    } else {
                        cachedExt[ext]++;
                    }
                }
            } catch (err) {
                if (err instanceof CounterError) {
                    return;
                } else {
                    debug(`err=`, err);
                }
            }
        }
    });
};

module.exports = processFolder;
