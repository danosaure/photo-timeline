import 'babel-regenerator-runtime';
import fs from 'fs';
import path from 'path';

import _debug from './debug';

const debug = _debug(__filename);

function* walker(item: string): IterableIterator<string> {
  debug('item=', item);
  const stats = fs.statSync(item);
  if (stats.isDirectory()) {
    debug('    isDirectory');
    // eslint-disable-next-line no-restricted-syntax
    for (const folderItem of fs.readdirSync(item)) {
      yield* walker(path.join(item, folderItem));
    }
  } else {
    yield item;
  }
}

export default walker;
