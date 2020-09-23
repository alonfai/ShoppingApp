import { isNumber } from './utils';

describe('shared/utils', () => {
  describe('isNumber', () => {
    it('empty value', () => {
      const res = isNumber(undefined);
      expect(res).toEqual(false);
    });
    it('nullable value', () => {
      let res = isNumber(null);
      expect(res).toEqual(false);
    });
    it('string as number', () => {
      let res = isNumber('224');
      expect(res).toEqual(true);
    });
    it('string as invalid number', () => {
      let res = isNumber('2fdf4');
      expect(res).toEqual(false);
    });
  });
});
