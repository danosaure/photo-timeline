const createFolderIfNeeded = require('./create-folder-if-needed');

module.exports = (destFolder, exifDate) => {
    const year = prepend0(exifDate.getUTCFullYear(), 4);
    const month = prepend0(exifDate.getUTCMonth() + 1);
    const date = prepend0(exifDate.getUTCDate());
    const hours = prepend0(exifDate.getUTCHours());
    const minutes = prepend0(exifDate.getUTCMinutes());
    const seconds = prepend0(exifDate.getUTCSeconds());
    const millis = prepend0(exifDate.getUTCMilliseconds(), 3);

    const destFolder = [ destinationFolder, year, month, date ].reduce(
        (dest, folder) => {
            const destSubFolder = path.join(dest, folder);
            createFolderIfNeeded(destSubFolder);
            return destSubFolder;
        },
        ''
    );
};
