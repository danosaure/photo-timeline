export default class CounterError extends Error {
  constructor(message:string) {
    super(message);
    this.name = `Danosaure.PhotoTimeline.${this.constructor.name}`;
  }
}
