const exif = require('fast-exif');

const counter = require('./../counter');
const debug = require('./debug')('cr2');

module.exports = async (filePath, destFolder, ext, limit) => {
    counter(limit);
    // TODO: Find exif data for CR2 files.
    return;

    const exifData = await exif.read(filePath);
    debug(`exifData=`, exifData);
    const exifDateTime = exifData.exif.DateTimeOriginal;
};
