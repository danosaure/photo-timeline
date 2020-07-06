class CounterError extends Error {
  constructor(message) {
    super(message);
    this.name = `Danosaure.PhotoTimeline.${this.constructor.name}`;
  }
}

module.exports = CounterError;
