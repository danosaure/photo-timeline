import Config from '../config';
import { EXTENSION } from '../constants';
import fileExtention from '../file-extension';

import _debug from './debug';
import ExifFile from './exif-file';
import JpgFile from './jpg-file';

const debug = _debug(__filename);

export default (config: Config, filePath: string): ExifFile | undefined => {
  debug(`(config, filePath="${filePath}")`);
  const ext = fileExtention(filePath);
  debug(`    ext=${ext}`);

  if (config.extension === EXTENSION.JPG && JpgFile.EXTENSIONS.includes(ext)) {
    debug(`        is JPG`);
    return new JpgFile(filePath);
  }
};
