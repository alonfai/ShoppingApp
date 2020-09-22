import { GetState, SetState, StateCreator, StoreApi } from 'zustand';
import * as Interfaces from 'shared/types';

/**
 * Log every time state is changed (ref; https://github.com/pmndrs/zustand#middleware)
 * @param config zustand configure store object method
 */
const log = (config: StateCreator<Interfaces.State>) => (
  set: SetState<Interfaces.State>,
  get: GetState<Interfaces.State>,
  api: StoreApi<Interfaces.State>
) =>
  config(
    (args: object) => {
      console.log('  applying', args);
      set(args);
      console.log('  new state', get());
    },
    get,
    api
  );

export default log;
