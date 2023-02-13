import { expect } from 'chai';

import moduleToTest from './file-extension';

describe('src/file-extension', () => {
  it('exports a function with 1 param', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  describe('()', () => {
    it('returns empty when no extension', () => {
      expect(moduleToTest('foo')).to.equal('');
    });

    it('returns extension if found', () => {
      expect(moduleToTest('foo.bar')).to.equal('bar');
    });

    it('returns extension in lowercase', () => {
      expect(moduleToTest('Foo.Bar')).to.equal('bar');
    });
  });
});
