const exif = require('fast-exif');
const path = require('path');

const constants = require('./constants');
const debug = require('./debug')('lib/process-file');
const fileExtension = require('./file-extension');
const prepend0 = require('./prepend-zero');

let counter = 0;

const processFile = async (filePath) => {
    counter += 1;

    if (constants.MAX_NUMBER_FILES_TO_RENAME !== -1 && counter > constants.MAX_NUMBER_FILES_TO_RENAME) {
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

        const dest = path.join(constants.SORTED_ROOT_FOLDER, year, month, date, `${year}${month}${date}-${hours}${minutes}${seconds}.${ext}`);
        debug(`processFile():     dest='${dest}'`);

    } catch (err) {
        console.error(`Error processing filePath=${filePath}: err=`, err);
    }
};

module.exports = processFile;
