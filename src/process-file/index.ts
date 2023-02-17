import Config from '../config';
import { ExifNotFoundError } from '../errors';
import ExifInfo from '../exif-info';

import _debug from './debug';
import factory from './factory';

const debug = _debug(__filename);

export default async (config: Config, filePath: string): Promise<ExifInfo | null> => {
  debug(`(config, filePath="${filePath}")`);

  const impl = factory(config, filePath);
  if (impl) {
    try {
      const info = await impl.load();
      return info;
    } catch (e) {
      if (e instanceof ExifNotFoundError) {
        impl.quarantine();
      } else {
        console.error('Generic error:', e);
      }
    }
  }
  return null;
};
