export default class ExifNotFoundError extends Error {
    constructor(message:string) {
        super(message);
        this.name = `Danosaure.PhotoTimeline.${this.constructor.name}`;
    }
}
