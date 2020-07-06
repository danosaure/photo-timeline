import { ArgumentParser } from 'argparse';

import { DEFAULT_LIMIT, EXTENSION } from './constants';
import packageJson from '../package.json';

const parser = new ArgumentParser({
  version: packageJson.version,
  addHelp: true,
  description: 'Sort folder of media files and rename them to date structure.',
});

parser.addArgument(['-d', '--debug'], {
  help: 'Enable debug mode',
  action: 'storeTrue',
  defaultValue: false,
});

parser.addArgument(['-l', '--limit'], {
  help: `Limit the number of files to process. -1 for all of them. (Default: ${DEFAULT_LIMIT})`,
  defaultValue: DEFAULT_LIMIT,
  type: 'int',
});

parser.addArgument(['-e', '--ext'], {
  help: 'List of extensions to process',
  required: true,
  action: 'append',
  choices: Object.values(EXTENSION).sort(),
});

parser.addArgument(['-t', '--target'], {
  help: 'Target folder.',
  required: true,
});

parser.addArgument('source', {
  nargs: '+',
});

export default parser;
