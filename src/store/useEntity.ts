import { useMemo } from 'react';

import db from './db.json';

export default function useEntity<T>(key: 'products' | 'promotions') {
  return useMemo(() => {
    const data = {};
    for (const item of db[key]) {
      data[item.id] = item;
    }
    return data;
  }, [key]) as T;
}
