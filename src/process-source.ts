import fs from 'fs';

import counter from './counter';
import folderWalker from './folder-walker';
import processFile from './process-file';

import _debug from './debug';

const debug = _debug(__filename);

export default async (source:string, dest:string, limit:number, extensions:string) => {
  debug(`source=${source}, dest=${dest}, limit=${limit}, extensions=`, extensions);

  if (fs.existsSync(source)) {
    const aCounter = counter(limit);
    const generator = folderWalker(source);

    // eslint-disable-next-line no-restricted-syntax
    for (const file of generator) {
      // eslint-disable-next-line no-await-in-loop
      const fileInfo = await processFile(file, extensions);
      debug('fileInfo=', fileInfo);
      if (fileInfo) {
        debug('Should process files...');

        aCounter.count();

        if (aCounter.done()) {
          break;
        }
      } else {
        debug(`Ignoring file '${file}'.`);
      }
    }
  } else {
    // eslint-disable-next-line no-console
    console.error(`Cannot find '${source}'. Ignoring...`);
  }
};
