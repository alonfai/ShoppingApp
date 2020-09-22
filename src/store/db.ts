import { Interfaces } from 'shared';
import db from './db.json';

/**
 * parse the database
 * @param key records collection to use
 * @param source datasource as json (mocked in the test cases)
 */
export function parseDB<T>(key: 'products' | 'promotions', source = db) {
  const data = new Map();
  for (const item of source[key]) {
    data.set(item.id, item);
  }
  return data as Map<string, T>;
}

export default {
  products: parseDB<Interfaces.Product>('products'),
  promotions: parseDB<Interfaces.Promotion>('promotions')
};
