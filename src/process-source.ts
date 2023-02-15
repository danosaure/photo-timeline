import fs from 'fs';

import Config from './config';
import counter from './counter';
import folderWalker from './folder-walker';
import processFile from './process-file';

export default async (config: Config): Promise<void> => {
  let fileCount = 0;
  
  if (fs.existsSync(config.source as string)) {
    const aCounter = counter(config.limit as number);
    const generator = folderWalker(config.source as string);

    // eslint-disable-next-line no-restricted-syntax
    for (const file of generator) {
      console.log("-----", fileCount++, "-----------------------------------------------------");
      // eslint-disable-next-line no-await-in-loop
      console.log("process-source: file=", file);

      try {
        await processFile(config, file);
          aCounter.count();

          if (aCounter.done()) {
            break;
          }
      } catch (err){
        console.warn(`Error with file '${file}':`, err);
      }
    }
  } else {
    // eslint-disable-next-line no-console
    console.error(`Cannot find '${config.source}'. Ignoring...`);
  }
};
