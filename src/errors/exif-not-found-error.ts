import { NAMESPACE } from '../constants';

export default class ExifNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = `${NAMESPACE}.${this.constructor.name}`;
  }
}
