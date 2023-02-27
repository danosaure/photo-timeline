export { default as defineFolder } from './define-folder';

import Config from '../config';
import ExifInfo from '../exif-info';

import _debug from './debug';

const debug = _debug(__filename);

export const createPath = async (config: Config, exifInfo: ExifInfo): Promise<void> => {
  debug(`createPath(): exifInfo=${exifInfo}; config=${config}`);
};
