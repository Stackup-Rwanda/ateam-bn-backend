import { expect } from 'chai';

import mochaAsync from '../helpers/mochaAsync';
import TokenHelper from '../helpers/TokenHelper';
import token from './mochData/mochToken';

const promise = (x, y) => {
  const prom = new Promise((reject, resolve) => {
    if (x !== y) {
      reject();
    } else {
      resolve();
    }
  });
  return prom;
};

describe('Test suite for helpers', () => {
  it('check if a promise was resolved', () => {
    const data = mochaAsync(promise(2, 2));
    expect(data()).to.not.eq(undefined);
  });

  it('check if a promise was rejected', () => {
    const data = mochaAsync(promise(4, 5));
    expect(data()).to.not.eq(undefined);
  });
});

describe('Test suite for /helpers/TokenHeper file', () => {
  it('should decode the token', () => {
    const data = TokenHelper.decodedToken(token, 'mysecretkey');
    expect(data).to.be.an('object');
    expect(data.isVerified).to.be.a('boolean');
    expect(data.role).to.be.a('string');
  });
});
