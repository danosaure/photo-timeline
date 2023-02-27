import { NAMESPACE } from '../constants';

export default class QuarantineFileExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = `${NAMESPACE}.${this.constructor.name}`;
  }
}
