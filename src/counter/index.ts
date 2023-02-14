import CounterError from './error';

const counter = (limit:number) => {
  let count = limit;

  return Object.freeze({
    done: () => count === 0,
    count: () => {
      console.log(`counter/index: (limit=${limit}). count=${count}.`);
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
