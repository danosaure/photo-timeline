import { NAMESPACE } from '../constants';

export default class CounterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = `${NAMESPACE}.${this.constructor.name}`;
  }
}
