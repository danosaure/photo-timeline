import path from 'path';

import Config from '../config';
import { EXTENSION } from '../constants';
import fileExtention from '../file-extension';

import _debug from './debug';
import ExifFile from './exif-file';
import JpgFile from './jpg-file';
import ToDelete from './to-delete';

const debug = _debug(__filename);

const _cache: { [key: string]: ExifFile } = {};

export default (config: Config, filePath: string): ExifFile | undefined => {
  debug(`(config, filePath="${filePath}")`);

  const basename = path.basename(filePath);
  // debug(`    basename=${basename}`);
  const cacheByBasename = _cache[basename];
  if (cacheByBasename) {
    return cacheByBasename;
  }

  if (ToDelete.FILENAMES.includes(basename)) {
    _cache[basename] = new ToDelete();
    return _cache[basename];
  }

  const ext = fileExtention(filePath);
  debug(`    ext=${ext}`);
  const cacheByExtension = _cache[ext];
  if (cacheByExtension) {
    return cacheByExtension;
  }

  if (config.extension === EXTENSION.JPG && JpgFile.EXTENSIONS.includes(ext)) {
    // debug(`        is JPG`);
    _cache[ext] = new JpgFile();
    return _cache[ext];
  }
};
