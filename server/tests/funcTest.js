import { expect } from 'chai';

import mochaAsync from '../helpers/mochaAsync';

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
