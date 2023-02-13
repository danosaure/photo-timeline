import Promise from 'bluebird';
import 'babel-regenerator-runtime';

import parseArgs from './parse-args';
import processSource from './process-source';

import _debug from './debug';

const debug = _debug(__filename);

(async () => {
  try {
    const args = parseArgs();

    if (args.debug) {
      debug.enable();
    }

    debug('args=', args);

    await Promise.each(
      args.source,
      async (source:string) => processSource(source, args.target, args.limit, args.ext),
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
})();
