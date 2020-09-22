import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from './middlewares/immer';
import db from './db';

/**
 * React hook to get the data store
 * @param storeName optional name for the data store, which will be prefixed to your actions
 */
export function getStore(storeName: string) {
  const store = produce(set => ({
    products: db.products,
    promotions: db.promotions,
    items: new Map(),
    discounts: new Set(),
    updateItems: (id, quantity) => {
      // product id selected exists
      const product = db.products.get(id);
      if (product) {
        set(draft => {
          if (quantity === 0) {
            draft.items.delete(id);
          } else {
            // Product was added before to the cart
            draft.items.set(id, {
              ...product,
              quantity
            });
          }
        });
        return true;
      } else {
        return false;
      }
    },
    addDiscount: id => {
      const promotion = db.promotions.get(id);
      // promotion id exists
      if (promotion) {
        set(draft => {
          draft.discounts.add(id);
        });
        return true;
      } else {
        return false;
      }
    }
  }));

  /**
   * return a devtools and log middlewares version of the store in development mode (ref: https://github.com/pmndrs/zustand#redux-devtools)
   */
  return process.env.NODE_ENV === 'development'
    ? create(devtools(store, storeName))
    : create(store);
}

export default getStore('Nintex');
