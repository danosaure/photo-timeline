const debug = require('debug')('danosaure:photo-timeline');
const constants = require('./lib/constants');
const processFolder = require('./lib/process-folder');
const Persistence = require('./lib/persistence');


const db = new Persistence(constants.SORTED_ROOT_FOLDER);
processFolder(constants.UNSORTED_ROOT_FOLDER);
