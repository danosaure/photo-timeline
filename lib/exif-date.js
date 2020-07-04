const exif = require('fast-exif');
const execFile = require('child_process').execFile;
const exiftool = require('dist-exiftool');

const DATE_RE = /(\d+):(\d+):(\d+) (\d+):(\d+):(\d+)/;

module.exports = async (filePath) => {
    const exifData = await exif.read(filePath);

    try {
        return new Date(exifData.exif.DateTimeOriginal);
    } catch (err) {
        return new Promise((resolve, reject) => {
            execFile(exiftool, ['-j', filePath], (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    const json = JSON.parse(stdout);
                    const dateTimeOriginal = json[0].DateTimeOriginal;
                    const m = dateTimeOriginal.match(DATE_RE);
                    const dateString = `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}.00Z`;
                    resolve(new Date(dateString));
                }
            });
        });
    }
};
