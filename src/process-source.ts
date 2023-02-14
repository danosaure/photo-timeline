import fs from 'fs';

import counter from './counter';
import folderWalker from './folder-walker';
import processFile from './process-file';

export default async (source:string, dest:string, limit:number, extensions:string) => {
  let fileCount = 0;
  
  console.log(`process-source: (source="${source}", dest="${dest}", limit=${limit}, extensions="${extensions}")`);
  if (fs.existsSync(source)) {
    const aCounter = counter(limit);
    const generator = folderWalker(source);

    // eslint-disable-next-line no-restricted-syntax
    for (const file of generator) {
      console.log("-----", fileCount++, "-----------------------------------------------------");
      // eslint-disable-next-line no-await-in-loop
      console.log("process-source: file=", file);

      const fileInfo = await processFile(file, extensions);
        if (fileInfo) {



          aCounter.count();

          if (aCounter.done()) {
            break;
          }
        } else {
          console.warn(`Ignoring file '${file}'.`);
        }
    }
  } else {
    // eslint-disable-next-line no-console
    console.error(`Cannot find '${source}'. Ignoring...`);
  }
};
