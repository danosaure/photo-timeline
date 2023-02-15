import 'babel-regenerator-runtime';

import { config } from './config';
import parseArgs from './parse-args';
import processSource from './process-source';

(async (): Promise<void> => {
  try {
    const args = await parseArgs();
    console.log("index: args=", args);

      config.limit = args.limit;
      config.quarantine = args.quarantine;
      config.source = args.source;
      config.target = args.target;

      await processSource(config);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
})();
