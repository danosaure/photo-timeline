const debug = require('./debug')('sort-files');
const constants = require('./lib/constants');
const processFolder = require('./lib/process-folder');
const Persistence = require('./lib/persistence');
const args = require('./lib/args');

const db = new Persistence(args.dest);
processFolder(args.source, args.dest, args.limit, {
    any: !args.jpg && !args.cr2 && !args.mov,
    cr2: args.cr2,
    jpg: args.jpg,
    mov: args.mov,
});
