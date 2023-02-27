import fs from 'fs';

import Config from '../config';
import ExifInfo from '../exif-info';

// import _debug from './debug';
import ExifFile from './exif-file';

// const debug = _debug(__filename);

export default class ToDelete extends ExifFile {
  static readonly FILENAMES = ['.DS_Store'];

  async process(config: Config, filePath: string): Promise<ExifInfo | null> {
    fs.unlinkSync(filePath);
    return null;
  }
}
