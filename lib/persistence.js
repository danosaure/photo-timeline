const path = require('path');
const Persistence = require('lokijs');

class DB {
    constructor(destFolder) {
        this.db = new Persistence(path.join(destFolder, 'timeline.json'));
    }
}

module.exports = DB;
