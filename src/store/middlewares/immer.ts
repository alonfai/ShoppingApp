import { StateCreator } from 'zustand';
import produce from 'immer';
import * as Interfaces from 'shared/types';

/**
 * use immer as proxy for the set method
 * @param config zustand configure store object method
 */
export default <T extends Interfaces.State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config(fn => set(produce(fn) as (state: T) => T), get, api);
