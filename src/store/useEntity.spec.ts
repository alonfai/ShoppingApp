import { Interfaces } from 'shared';
import useEntity from './useEntity';

describe('store/useEntity', () => {
  it('return unique key/value object based on the db.json input file', () => {
    const sourceProducts: Interfaces.Product[] = [
      {
        id: 'product_1',
        name: 'Product 1',
        price: 10
      },
      {
        id: 'product_2',
        name: 'Product 2',
        price: 20
      }
    ];
    const sourcePromotions: Interfaces.Promotion[] = [
      {
        id: 'promotion_1',
        description: 'Promotion number 1'
      },
      {
        id: 'promotion_2',
        description: 'Promotion number 2'
      }
    ];
    const products = useEntity<{
      [id: string]: Interfaces.Product;
    }>('products', {
      products: sourceProducts,
      promotions: sourcePromotions
    });

    expect(Object.keys(products)).toEqual(['product_1', 'product_2']);
    expect(products['product_1']).toEqual(sourceProducts[0]);
    expect(products['product_2']).toEqual(sourceProducts[1]);

    const promotions = useEntity<{
      [id: string]: Interfaces.Promotion;
    }>('promotions', { products: sourceProducts, promotions: sourcePromotions });

    expect(Object.keys(promotions)).toEqual(['promotion_1', 'promotion_2']);
    expect(promotions['promotion_1']).toEqual(sourcePromotions[0]);
    expect(promotions['promotion_2']).toEqual(sourcePromotions[1]);
  });
});
