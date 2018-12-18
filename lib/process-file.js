const exif = require('fast-exif');
const path = require('path');

const constants = require('./constants');
const createFolderIfNeeded = require('./create-folder-if-needed');
const debug = require('./debug')('lib/process-file');
const fileExtension = require('./file-extension');
const moveFileIfNotDuplicate = require('./move-file-if-not-duplicate');
const prepend0 = require('./prepend-zero');

const processFile = async (filePath) => {

    // debug(`processFile() filePath=${filePath}`);

    try {
        const exifData = await exif.read(filePath);
        // debug(`exifData=`, exifData);
        const exifDateTime = exifData.exif.DateTimeOriginal;

        if (!exifDateTime) {
            throw new Error(`Cannot find exif for filePath="${filePath}".`);
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

        const destFolder = [ constants.SORTED_ROOT_FOLDER, year, month, date ].reduce(
            (dest, folder) => {
                const destSubFolder = path.join(dest, folder);
                createFolderIfNeeded(destSubFolder);
                return destSubFolder;
            },
            ''
        );
        const dest = path.join(destFolder, `${year}${month}${date}-${hours}${minutes}${seconds}.${ext}`);

        try {
            moveFileIfNotDuplicate(filePath, dest);
        } catch (err) {
        }
    } catch (err) {
        console.error(`Error processing filePath=${filePath}: err=`, err);
    }
};

module.exports = processFile;
