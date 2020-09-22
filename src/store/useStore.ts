import create, { UseStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from './middlewares/immer';
import log from './middlewares/log';
import * as Interfaces from 'shared/types';
import useEntity from './useEntity';

/**
 * React hook to get the data store
 * @param storeName optional name for the data store, which will be prefixed to your actions
 */
export default function useStore(storeName = 'Nintex') {
  const products = useEntity<{
    [id: string]: Interfaces.Product;
  }>('products');
  const promotions = useEntity<{
    [id: string]: Interfaces.Promotion;
  }>('promotions');

  const store = produce(set => ({
    products,
    promotions,
    items: {},
    discounts: new Set(),
    updateProducts: (id, quantity) => {
      // product id selected exists
      if (products[id]) {
        set(draft => {
          // Product was added before to the cart
          draft.items[id] = quantity;
        });
        return true;
      } else {
        return false;
      }
    },
    removePromotion: id => {
      // promotion id exists
      if (promotions[id]) {
        set(draft => {
          return draft.discounts.delete(id);
        });
        return true;
      } else {
        return false;
      }
    },
    addPromotion: id => {
      // promotion id exists
      if (promotions[id]) {
        set(draft => {
          draft.discounts.add(id);
        });
        return true;
      } else {
        return false;
      }
    }
  }));

  // Create a store with set method turned into an immer proxy to avoid changing nested state with log enabled for development mode
  const createStore: UseStore<Interfaces.State> = create<Interfaces.State>(
    process.env.NODE_ENV === 'development' ? log(store) : store
  );

  /**
   * return a devtools middleware version of the store (ref: https://github.com/pmndrs/zustand#redux-devtools)
   */
  return create(devtools(createStore, storeName));
}
