import exif from 'fast-exif';
// import path from 'path';

// const counter = require('../counter');
// const debug = require('./debug')('jpg');
// const moveFileIfNotDuplicate = require('../move-file-if-not-duplicate');
// const prepend0 = require('../prepend-zero');

import _debug from './debug';

const debug = _debug(__filename);

export default async (filePath, ext) => {
  debug(`(filePath='${filePath}')`);

  try {
    const exifData = await exif.read(filePath);
    // debug(`exifData=`, exifData);
    const exifDateTime = exifData.exif.DateTimeOriginal;
    if (!exifDateTime) {
      throw new Error(`Cannot find exif for filePath="${filePath}".`);
    }

    return [{
      id: `${exifData.image.Make}.${exifData.image.Model}`,
      ext,
      filePath,
      date: new Date(exifDateTime),
    }];
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(`Error processing filePath='${filePath}': err=`, err);
    throw err;
  }
};
