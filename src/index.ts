import 'babel-regenerator-runtime';

import parseArgs from './parse-args';
import processSource from './process-source';

(async () => {
  try {
    const args = await parseArgs();
    console.log("index: args=", args);

    if (args.source) {
      await processSource(args.source, args.target, args.limit, args.ext);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
})();
