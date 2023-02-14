import { expect } from 'chai';

import moduleToTest from './index';

describe('src/counter/index', () => {
  it('exports a function with 1 param', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  describe('()', () => {
    it('returns an object', () => {
      const value = moduleToTest(1);
      expect(value).to.be.an('object');
    });
  });
});
