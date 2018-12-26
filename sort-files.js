const debug = require('./lib/debug')('sort-files');
const constants = require('./lib/constants');
const processFolder = require('./lib/process-folder');
const Persistence = require('./lib/persistence');
const args = require('./lib/args');

const db = new Persistence(args.dest);
processFolder(args.source, args.dest, args.limit);
