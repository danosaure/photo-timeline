import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { DEFAULT_LIMIT, EXTENSION } from './constants';

export default async () => yargs(hideBin(process.argv))
  .options({
    debug: {
      type: 'boolean',
      description: "Display debugging messages.",
      default: false,
    },
    limit: {
      type: 'number',
      description: `Limit the number of files to process. -1 for all of them. (Default: ${DEFAULT_LIMIT})`,
      default: DEFAULT_LIMIT,
    },
    ext: {
      type: 'string',
      choices: Object.values(EXTENSION).sort(),
      demandOption: true,
      description: 'List of extensions to process',
    },
    quarantine: {
      type: 'string',
      description: 'Quarantine folder for files without EXIF data.',
      demandOption: true,
    },
    source: {
      type: 'string',
      description: 'Source folder',
      demandOption: true,
    },
    target: {
      type: 'string',
      description: 'Target folder.',
      demandOption: true,
    },
  })
  .argv;
