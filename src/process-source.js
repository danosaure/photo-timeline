import fs from 'fs';

import counter from './counter';
import folderWalker from './folder-walker';
import processFile from './process-file';

// import path from 'path';
// import Promise from 'bluebird';

// import counter from './counter';
// import fileExtension from './file-extension';

import _debug from './debug';

const debug = _debug(__filename);

// const cachedExt = {};

export default async (source, dest, limit, extensions) => {
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

  // const items = fs.readdirSync(source);

  // await Promise.each(items, async (item) => {
  //   const itemPath = path.join(source, item);
  //   const stats = fs.statSync(itemPath);
  //   if (stats.isDirectory()) {

  //     const subItems = fs.readdirSync(itemPath);
  //     if (subItems.length === 0) {
  //       fs.rmdirSync(itemPath);
  //     }
  //   } else {
  //     const ext = fileExtension(itemPath);
  //     // debug(`ext=${ext}`);

  //     try {
  //       if ((ext === 'jpg' || ext === 'jpeg') && (extensions.jpg ||
  //       extensions.any)) {
  //         await processFile.jpg(itemPath, dest, ext, limit);
  //       } else if (ext === 'cr2' && (extensions.cr2 || extensions.any)) {
  //         await processFile.cr2(itemPath, dest, ext, limit);
  //       } else if (ext === 'mov' && (extensions.mov || extensions.any)) {
  //         await processFile.mov(itemPath, dest, ext, limit);
  //       } else if (!cachedExt[ext]) {
  //         debug(`Unprocessed ext=${ext}.`);
  //         cachedExt[ext] = 1;
  //       } else {
  //         cachedExt[ext] += 1;
  //       }
  //     } catch (err) {
  //       if (err instanceof counter.Error) {

  //       } else {
  //         debug('err=', err);
  //       }
  //     }
  //   }
  // });
};
