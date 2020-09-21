import create, { EqualityChecker, StateCreator, StateSelector } from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import * as Interfaces from 'shared/types';

import useEntity from './useEntity';

export default function useStore(
  selector?: StateSelector<Interfaces.State, any>,
  equalityFn?: EqualityChecker<any>
) {
  const products = useEntity<{
    [id: string]: Interfaces.Product;
  }>('products');
  const promotions = useEntity<{
    [id: string]: Interfaces.Promotion;
  }>('promotions');

  /**
   * use immer as proxy for the set method
   * @param config zustand configure store object method
   */
  const immer = <T extends Interfaces.State>(
    config: StateCreator<T, (fn: (draft: T) => void) => void>
  ): StateCreator<T> => (set, get, api) =>
    config(fn => set(produce(fn) as (state: T) => T), get, api);

  // Create a store with set method turned into an immer proxy to avoid changing nested state
  const getStore = create<Interfaces.State>(
    immer(set => ({
      products: {},
      promotions: new Set(),
      updateProducts: (id, quantity) => {
        // product id selected exists
        if (products[id]) {
          set(draft => {
            // Product was added before to the cart
            draft.products[id] = quantity;
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
            return draft.promotions.delete(id);
          });
          return true;
        } else {
          return false;
        }
      },
      addPromotion: (id: string) => {
        // promotion id exists
        if (promotions[id]) {
          set(draft => {
            draft.promotions.add(id);
          });
          return true;
        } else {
          return false;
        }
      }
    }))
  );

	/**
	 * compose the store based on input selector
	 */
  const store = selector ? getStore(selector, equalityFn) : getStore();

  /**
   * on development mode, return a devtools middleware version of the store (ref: https://github.com/pmndrs/zustand#redux-devtools)
   */
  if (process.env.NODE_ENV === 'development') {
    return create(devtools(store, 'Nintex'));
  }
  return store;
}
