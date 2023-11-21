import { expect } from '@jest/globals';

import { sanitizePhone } from './sanitize-phone';

describe('Sanitize phone', () => {
  it('', () => {
    const result = sanitizePhone('+79039471234');
    expect(result).toEqual('+79039471234');
  });

  it('', () => {
    const result = sanitizePhone('+7 (903) 947 12-34');
    expect(result).toEqual('+79039471234');
  });

  it('', () => {
    const result = sanitizePhone('+7 (903) + 947 +12-34');
    expect(result).toEqual('+79039471234');
  });

  it('', () => {
    const result = sanitizePhone('9039471234');
    expect(result).toEqual('+79039471234');
  });
  it('', () => {
    const result = sanitizePhone('89039471234');
    expect(result).toEqual('+79039471234');
  });
});
