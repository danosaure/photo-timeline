const exif = require('fast-exif');
const path = require('path');

const counter = require('./../counter');
const debug = require('./debug')('jpg');
const moveFileIfNotDuplicate = require('./../move-file-if-not-duplicate');
const prepend0 = require('./../prepend-zero');

const processFile = async (filePath, destinationFolder, ext, limit) => {
    // debug(`processFile() filePath=${filePath}`);
    counter(limit);

    try {
        const exifData = await exif.read(filePath);
        // debug(`exifData=`, exifData);
        const exifDateTime = exifData.exif.DateTimeOriginal;

        if (!exifDateTime) {
            throw new Error(`Cannot find exif for filePath="${filePath}".`);
        }

        const exifDate = new Date(exifDateTime);

        const destFolder = destSubFolder(destinationFolder, exifDate);
        const dest = path.join(destFolder, `${year}${month}${date}-${hours}${minutes}${seconds}.${ext}`);

        try {
            await moveFileIfNotDuplicate(filePath, dest);
        } catch (err) {
            console.error(`Error moving file:`, err);
        }
    } catch (err) {
        console.error(`Error processing filePath=${filePath}: err=`, err);
    }
};

module.exports = processFile;
