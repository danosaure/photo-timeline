import Config from '../config';
import { EXTENSION, EXTENSIONS } from '../constants';
import fileExtention from '../file-extension';

import ExifFile from './exif-file';
import JpgFile from './jpg-file';

export default (config:Config, filePath:string): ExifFile|undefined => {
    const ext = fileExtention(filePath);

    if ((config.extension === EXTENSION.JPG) && JpgFile.EXTENSIONS.includes(ext)) {
        return new JpgFile(filePath);
    }
};
