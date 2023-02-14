import 'babel-regenerator-runtime';
import fs from 'fs';
import path from 'path';

function* walker(item:string):IterableIterator<string> {
  console.log('folder-walker: item=', item);
  const stats = fs.statSync(item);
  if (stats.isDirectory()) {
    // eslint-disable-next-line no-restricted-syntax
    for (const folderItem of fs.readdirSync(item)) {
      yield* walker(path.join(item, folderItem));
    }
  } else {
    yield item;
  }
}

export default walker;
