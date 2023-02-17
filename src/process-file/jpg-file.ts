import { load as exifReaderLoad } from 'exifreader';

import ExifFile from './exif-file';
import ExifInfo from '../exif-info';

export default class JpgFile extends ExifFile {
  static readonly EXTENSIONS = ['jpg', 'jpeg'];

  async load(): Promise<ExifInfo> {
    const exifData = await exifReaderLoad(this.filePath);
    return new ExifInfo(this.filePath, exifData);
  }
}

// export default async (filePath:string): Promise<ExifInfo> => {
//   console.log(`process-file/jpg: (filePath="${filePath}")`);
//   try {
//     const exifData = await exifReaderLoad(filePath);
//     const exifDateTime = exifData.DateTimeOriginal?.description;
//     if (!exifDateTime) {
//       throw new ExifNotFoundError(filePath);
//     }

//     return new ExifInfo(exifData);
//   } catch (err) {
//     /* eslint-disable-next-line no-console */
//     console.error(`Error processing filePath='${filePath}': err=`, err);
//     throw err;
//   }
// };
