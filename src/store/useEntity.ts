import { useMemo } from 'react';

import db from './db.json';

export default function useEntity<T extends object>(key: 'products' | 'promotions', source = db) {
  return useMemo(() => {
    const data = {};
    for (const item of db[key]) {
      data[item.id] = item;
    }
    return data;
  }, [key]) as T;
}
