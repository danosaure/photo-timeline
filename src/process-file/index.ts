import Config from '../config';
import { ExifNotFoundError } from '../errors';
import ExifInfo from '../exif-info';

// import _debug from './debug';
import factory from './factory';

// const debug = _debug(__filename);

export default async (config: Config, filePath: string): Promise<ExifInfo | null> => {
  const impl = factory(config, filePath);
  if (impl) {
    try {
      const exifInfo = await impl.process(config, filePath);
      return exifInfo;
    } catch (e) {
      if (e instanceof ExifNotFoundError) {
        impl.quarantine(config, filePath);
      } else {
        console.error('Generic error:', e);
      }
    }
  }
  return null;
};
