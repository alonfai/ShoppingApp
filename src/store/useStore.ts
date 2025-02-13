import create, { GetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from './middlewares/immer';
import db from './db';
import { Interfaces } from 'shared';

function updateItems(
  set: (fn: (draft: Interfaces.State) => void) => void,
  get: GetState<Interfaces.State>
) {
  return function (id: string, quantity: number) {
    const { products } = get();
    // product id selected exists
    const product = products.get(id);
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
  };
}

function updatePromotion(
  set: (fn: (draft: Interfaces.State) => void) => void,
  get: GetState<Interfaces.State>
) {
  return function (discountCode: string) {
    const { promotions } = get();
    const promotion = promotions.get(discountCode);

    // promotion id exists
    if (promotion) {
      set(draft => {
        draft.discountCode = discountCode;
      });
      return true;
    } else {
      return false;
    }
  };
}

/**
 * React hook to get the data store
 * @param storeName optional name for the data store, which will be prefixed to your actions
 */
/* istanbul ignore next */
export function getStore(storeName: string) {
  const store = produce((set, get) => ({
    products: db.products,
    promotions: db.promotions,
    items: new Map(),
    discountCode: '',
    totalPrice: 0,
    updateItems: updateItems(set, get),
    updatePromotion: updatePromotion(set, get)
  }));

  /**
   * return a devtools and log middlewares version of the store in development mode (ref: https://github.com/pmndrs/zustand#redux-devtools)
   */
  return process.env.NODE_ENV === 'development'
    ? create(devtools(store, storeName))
    : create(store);
}

export default getStore('Nintex');
