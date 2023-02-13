import { ArgumentParser } from 'argparse';

import { DEFAULT_LIMIT, EXTENSION } from './constants';
import packageJson from '../package.json';

const parser = new ArgumentParser({
  add_help: true,
  description: 'Sort folder of media files and rename them to date structure.',
});

parser.add_argument('-v', '--version', {
  action: 'version',
  version: packageJson.version,
});

parser.add_argument('-d', '--debug', {
  help: 'Enable debug mode',
  action: 'store_true',
  default: false,
});

parser.add_argument('-l', '--limit', {
  help: `Limit the number of files to process. -1 for all of them. (Default: ${DEFAULT_LIMIT})`,
  default: DEFAULT_LIMIT,
  type: 'int',
});

parser.add_argument('-e', '--ext', {
  help: 'List of extensions to process',
  required: true,
  action: 'append',
  choices: Object.values(EXTENSION).sort(),
});

parser.add_argument('-t', '--target', {
  help: 'Target folder.',
  required: true,
});

parser.add_argument('source', {
  nargs: '+',
});

export default parser;
