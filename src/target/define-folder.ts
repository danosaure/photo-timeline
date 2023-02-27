import path from 'path';

import Config from '../config';

import _debug from './debug';

const debug = _debug(__filename);

export default (config: Config, filePath: string, destinationFolder: string): string => {
  const source = config.source;
  const fileFolder = filePath.substring(source.length);
  debug(`fileFolder=${fileFolder}`);

  const destination = path.join(destinationFolder, fileFolder);

  debug(`destination=${destination}`);

  return path.dirname(destination);
};
