import ExifInfo from '../exif-info';

export default abstract class ExifFile {
    readonly filePath:string;

    constructor(filePath:string) {
        this.filePath = filePath;
    }

    abstract load(): Promise<ExifInfo>;

    async quarantine(): Promise<void> {
        console.log(`process-file/exif-file:     need to quarantine filePath="${this.filePath}".`)
    }
}
