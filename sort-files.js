const exif = require('fast-exif');
const debug = require('debug')('danosaure:photo-timeline');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const UNSORTED_ROOT_FOLDER = 'TO-SORT';
const SORTED_ROOT_FOLDER = 'SORTED';
const MAX_NUMBER_FILES_TO_RENAME = -1; // 100; // -1 to unlimited.

let counter = 0;

const fileExtension = (filePath) => filePath.slice((filePath.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();

const prepend0 = (value, len = 2) => {
    let returnValue = value.toString();
    while (returnValue.length < len) {
        returnValue = `0${returnValue}`;
    }
    return returnValue;
};

const createFolderIfNeeded = (folder) => {
    if (fs.existsSync(folder)) {
        const stats = fs.statSync(folder);
        if (!stats.isDirectory()) {
            throw new Error(`Expected '${folder}' to be a directory.`);
        }
    } else {
        fs.mkdirSync(folder);
    }
};

const processFile = async (filePath) => {
    counter += 1;

    if (MAX_NUMBER_FILES_TO_RENAME !== -1 && counter > MAX_NUMBER_FILES_TO_RENAME) {
        return;
    }

    debug(`processFile() filePath=${filePath}`);

    try {
        const exifData = await exif.read(filePath);
        // debug(`exifData=`, exifData);
        const exifDateTime = exifData.exif.DateTimeOriginal;

        if (!exifDateTime) {
            throw new Error(`Cannot find exif for filePath=${filePath}.`);
        }

        const exifDate = new Date(exifDateTime);

        const year = prepend0(exifDate.getUTCFullYear(), 4);
        const month = prepend0(exifDate.getUTCMonth() + 1);
        const date = prepend0(exifDate.getUTCDate());
        const hours = prepend0(exifDate.getUTCHours());
        const minutes = prepend0(exifDate.getUTCMinutes());
        const seconds = prepend0(exifDate.getUTCSeconds());
        const millis = prepend0(exifDate.getUTCMilliseconds(), 3);

        const ext = fileExtension(filePath);

        const dest = path.join(SORTED_ROOT_FOLDER, year, month, date, `${year}${month}${date}-${hours}${minutes}${seconds}.${ext}`);
        debug(`processFile():     dest='${dest}'`);

    } catch (err) {
        console.error(`Error processing filePath=${filePath}: err=`, err);
    }
};


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

processFolder(UNSORTED_ROOT_FOLDER);
