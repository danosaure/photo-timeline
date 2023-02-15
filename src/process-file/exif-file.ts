import ExifInfo from '../exif-info';

import _debug from './debug';

const debug = _debug(__filename);

export default abstract class ExifFile {
    readonly filePath:string;

    constructor(filePath:string) {
        this.filePath = filePath;
    }

    abstract load(): Promise<ExifInfo>;

    async quarantine(): Promise<void> {
        debug(`process-file/exif-file:     need to quarantine filePath="${this.filePath}".`)
    }
}
