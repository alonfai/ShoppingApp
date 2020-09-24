import { renderHook, act } from '@testing-library/react-hooks';
import { Interfaces } from 'shared';
import shortid from 'shortid';
import useStore from './useStore';

import db from './db';

describe('store/useStore', () => {
  const { products, promotions } = db;

  const arrProducts = Array.from(products.values());
  const arrPromotions = Array.from(promotions.values());

  describe('updateItems', () => {
    it('success adding a product with quantity higher than 0', async () => {
      const { result } = renderHook(
        ({ items }) => {
          const store = useStore();
          // store.updateItems(arrprod);
          return store;
        },
        {
          initialProps: {
            items: new Map<string, Interfaces.Item>()
          }
        }
      );
      expect(result.current).toBeDefined();
      act(() => {
        const res = result.current.updateItems(arrProducts[0].id, 2);
        expect(res).toEqual(true);
      });

      expect(result.current.items.size).toEqual(1);
    });

    it('success with quantity of 0 => remove the given item', () => {
      const { result } = renderHook(
        ({ items }) => {
          const store = useStore();
          return store;
        },
        {
          initialProps: {
            items: new Map<string, Interfaces.Item>()
          }
        }
      );
      expect(result.current).toBeDefined();
      act(() => {
        const res = result.current.updateItems(arrProducts[0].id, 2);
        expect(res).toEqual(true);
      });

      expect(result.current.items.size).toEqual(1);

      act(() => {
        const res = result.current.updateItems(arrProducts[0].id, 0);
        expect(res).toEqual(true);
      });

      expect(result.current.items.size).toEqual(0);
    });

    it('failed', async () => {
      const { result } = renderHook(
        ({ items }) => {
          const store = useStore();
          store.items = items;
          return store;
        },
        {
          initialProps: {
            items: new Map<string, Interfaces.Item>()
          }
        }
      );
      expect(result.current).toBeDefined();
      const { items } = result.current;

      expect(items.size).toEqual(0);
      act(() => {
        const res = result.current.updateItems('ssdsd2', 2);
        expect(res).toEqual(false);
      });

      expect(result.current.items.size).toEqual(0);
    });
  });

  describe('updatePromotion', () => {
    it('success', async () => {
      const { result } = renderHook(
        ({ discountCode }) => {
          const store = useStore();
          // store.discountCode = discountCode;
          return store;
        },
        {
          initialProps: {
            discountCode: ''
          }
        }
      );
      expect(result.current).toBeDefined();
      act(() => {
        const res = result.current.updatePromotion(arrPromotions[0].id);
        expect(res).toEqual(true);
      });

      expect(result.current.discountCode).toEqual(arrPromotions[0].id);
    });

    it('failed', async () => {
      const { result } = renderHook(
        ({ discountCode }) => {
          const store = useStore();
          store.discountCode = discountCode;
          return store;
        },
        {
          initialProps: {
            discountCode: ''
          }
        }
      );
      expect(result.current).toBeDefined();
      act(() => {
        const res = result.current.updatePromotion(shortid.generate());
        expect(res).toEqual(false);
      });

      expect(result.current.discountCode).toEqual('');
    });
  });
});
