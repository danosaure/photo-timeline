import { load as exifReaderLoad } from 'exifreader';
import { ExifNotFoundError } from '../errors';

import Config from '../config';
import ExifInfo from '../exif-info';

// import _debug from './debug';
import ExifFile from './exif-file';

// const debug = _debug(__filename);

export default class JpgFile extends ExifFile {
  static readonly EXTENSIONS = ['jpg', 'jpeg'];

  async process(config: Config, filePath: string): Promise<ExifInfo | null> {
    const exifData = await exifReaderLoad(filePath);
    if (!exifData.DateTimeOriginal?.description) {
      throw new ExifNotFoundError(filePath);
    }
    const exifInfo = new ExifInfo(filePath, exifData);
    return exifInfo;
  }
}
