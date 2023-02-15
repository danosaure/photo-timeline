import 'babel-regenerator-runtime';

import Config from './config';
import { enable as enableDebug } from './debug';
import parseArgs from './parse-args';
import processSource from './process-source';

(async (): Promise<void> => {
  try {
    const args = await parseArgs();
    const config = new Config(args);

    if (args.debug) {
      enableDebug();
    }

      await processSource(config);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
})();
