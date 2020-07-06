// import cr2 from './cr2';
import jpg from './jpg';
// import mov from './mov';

import { EXTENSION, EXTENSIONS } from '../constants';
import fileExtention from '../file-extension';

import _debug from './debug';

const debug = _debug(__filename);

export default async (filePath, fileTypes) => {
  debug(`(filePath=${filePath}, fileTypes=${fileTypes})`);
  const ext = fileExtention(filePath);
  debug('ext=', ext);

  if (fileTypes.includes(EXTENSION.JPG) && EXTENSIONS.JPG.includes(ext)) {
    return jpg(filePath, EXTENSION.JPG);
  }

  return null;
};

// module.exports = Object.freeze({
//     cr2: require('./cr2'),
//     jpg: require('./jpg'),
//     mov: require('./mov'),
// });
