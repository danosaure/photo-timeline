import { CounterError } from '../errors';

import _debug from './debug';

const debug = _debug(__filename);

const counter = (limit:number) => {
  let count = limit;

  return Object.freeze({
    done: () => count === 0,
    count: () => {
      debug(`(limit=${limit}). count=${count}.`);
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
