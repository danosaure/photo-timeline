const CounterError = require('./error');

let counter = 0;

module.exports = (limit) => {
    counter += 1;

    if (limit !== -1 && counter > limit) {
        throw new CounterError(`Limit of ${limit} exceeded.`);
    }
};
