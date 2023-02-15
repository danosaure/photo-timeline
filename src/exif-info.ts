import { Tags as ExifReaderTags } from 'exifreader';

import { ExifNotFoundError } from './errors';

export default class ExifInfo {
    readonly exifData: ExifReaderTags;
    readonly filePath: string;

    constructor(filePath:string, exifData: ExifReaderTags) {
        if (exifData.DateTimeOriginal?.description) {
            this.filePath = filePath;
        this.exifData = exifData;
        } else {
            throw new ExifNotFoundError(filePath);
        }
        // return [{
        //     id: `${exifData.Make?.description}.${exifData.Model?.description}`,
        //     ext,
        //     filePath,
        //     date: new Date(exifDateTime),
        //   }];
    }
}
