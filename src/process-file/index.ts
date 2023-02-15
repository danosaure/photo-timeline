import jpg from './jpg-file';

import Config from '../config';
import { EXTENSION, EXTENSIONS } from '../constants';
import { ExifNotFoundError } from '../errors';
import factory from './factory';
import ExifInfo from '../exif-info';

export default async (config:Config, filePath:string): Promise<void> => {
  console.log(`process-file/index: (config, filePath="${filePath}")`);

  const impl = factory(config, filePath);
  if (impl) {
    try {
      const info = await impl.load();
      console.log(`process-file/index: info=`, info);
    } catch (e) {
      if (e instanceof ExifNotFoundError) {
        impl.quarantine();
      } else {
        console.error("Generic error:", e);
      }
    }
  }
};
