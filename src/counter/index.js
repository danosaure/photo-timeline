import CounterError from './error';

const counter = (limit) => {
  let count = limit;

  return Object.freeze({
    done: () => count === 0,
    count: () => {
      if (limit === -1) {
        return;
      }

      if (count < 0) {
        throw new CounterError(`Invalid counter value ${count}.`);
      }

      if (count === 0) {
        throw new CounterError(`Limit of ${limit} exceeded.`);
      }

      count -= 1;
    },
    isInfinite: () => limit === -1,
  });
};

counter.Error = CounterError;

export default counter;
