const ArgumentParser = require('argparse').ArgumentParser;

const constants = require('./constants');
const packageJson = require('./../package.json');

const parser = new ArgumentParser({
    version: packageJson.version,
    addHelp: true,
    description: "Sort folder of media files and rename them to date structure."
});

parser.addArgument(['-d', '--dest'], {
    help: `Destination folder. (Default: ${constants.DEFAULT_DEST})`,
    defaultValue: constants.DEFAULT_DEST,
});

parser.addArgument(['-s', '--source'], {
    help: `Source folder. (Default: ${constants.DEFAULT_SOURCE})`,
    defaultValue: constants.DEFAULT_SOURCE,
});

parser.addArgument(['-l', '--limit'], {
    help: `Limit the number of files to process. -1 for all of them. (Default: ${constants.DEFAULT_LIMIT})`,
    defaultValue: constants.DEFAULT_LIMIT,
    type: 'int',
});

module.exports = parser.parseArgs();
