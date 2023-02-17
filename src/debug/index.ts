import debug from 'debug';

import buildPath from './build-path';
import DEBUG_KEY from './debug-key';

export default (info: string | string[]) => {
  const path = buildPath(['src'].concat(info));
  return debug(`${DEBUG_KEY}:${path}`);
};

export const enable = (): void => debug.enable(`${DEBUG_KEY}:*`);
