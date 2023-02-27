import fs from 'fs';
import path from 'path';

import Config from '../config';
import { QuarantineFileExistsError } from '../errors';
import ExifInfo from '../exif-info';
import { defineFolder } from '../target';

import _debug from './debug';

const debug = _debug(__filename);

export default abstract class ExifFile {
  quarantineFolder(config: Config, filePath: string): string {
    return defineFolder(config, filePath, config.quarantine);
  }

  abstract process(config: Config, filePath: string): Promise<ExifInfo | null>;

  quarantine(config: Config, filePath: string): void {
    const destinationFolder = this.quarantineFolder(config, filePath);
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
    this.moveToTarget(filePath, destinationFolder);
  }

  moveToTarget(filePath: string, destinationFolder: string): void {
    const filename = path.basename(filePath);
    const destinationFile = path.join(destinationFolder, filename);
    debug(`    .moveToTarget(): destinationFile=${destinationFile}`);
    if (fs.existsSync(destinationFile)) {
      throw new QuarantineFileExistsError(filePath);
    }

    fs.renameSync(filePath, destinationFile);
  }
}
