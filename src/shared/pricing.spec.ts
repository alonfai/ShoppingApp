import { renderHook, act } from '@testing-library/react-hooks';
import { mocks } from 'mocks';
import shortid from 'shortid';
import usePricing, { usePriceDefault } from './pricing';

describe('shared/pricing', () => {
  const items = Array.from(mocks.items.values());
  describe('usePricingDefault', () => {
    it('empty list of items', () => {
      const { result } = renderHook(() => usePriceDefault([]));
      expect(result.current).toEqual(0);
    });

    it('give list of items', () => {
      const { result } = renderHook(() => usePriceDefault(items));

      let total = 0;
      for (const item of items) {
        total += item.price * item.quantity;
      }
      expect(result.current).toEqual(total);
    });
  });

  describe('usePricing', () => {
    it('invalid code => return 0', () => {
      const { result } = renderHook(() => usePricing(shortid.generate(), items));
      expect(result.current).toEqual(0);
    });

    describe('useCalcPricingOnCodeA result correctly', () => {
      it('valid code => return positive result', () => {
        const { result } = renderHook(() => usePricing('RRD4D32', items));
        expect(result.current).toBeGreaterThan(0);
      });
    });

    describe('useCalcPricingOnCodeB result correctly', () => {
      it('valid code => return positive result', () => {
        const { result } = renderHook(() => usePricing('44F4T11', items));
        expect(result.current).toBeGreaterThan(0);
      });
    });

    describe('useCalcPricingOnCodeC result correctly', () => {
      it('valid code => return positive result', () => {
        const { result } = renderHook(() => usePricing('FF9543D1', items));
        expect(result.current).toBeGreaterThan(0);
      });
    });

    describe('useCalcPricingOnCodeD result correctly', () => {
      it('valid code => return positive result', () => {
        const { result } = renderHook(() => usePricing('YYGWKJD', items));
        expect(result.current).toBeGreaterThan(0);
      });
    });
  });
});
