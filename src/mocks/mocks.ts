import create from 'zustand';
import createVanilla, { GetState, SetState } from 'zustand/vanilla';
import { Interfaces } from 'shared';

const product_1: Interfaces.Product = {
  id: 'product_1',
  name: 'product 1',
  price: 9
};

const product_2: Interfaces.Product = {
  id: 'product_2',
  name: 'product 2',
  price: 15.5
};

const product_3: Interfaces.Product = {
  id: 'product_3',
  name: 'product 3',
  price: 21.1
};

const products: Map<string, Interfaces.Product> = new Map();
products.set(product_1.id, product_1);
products.set(product_2.id, product_2);
products.set(product_3.id, product_3);

const promotion_1: Interfaces.Promotion = {
  id: 'promotion_1',
  description: 'This is the first promotion'
};
const promotion_2: Interfaces.Promotion = {
  id: 'promotion_2',
  description: 'This is the second promotion'
};
const promotion_3: Interfaces.Promotion = {
  id: 'promotion_3',
  description: 'This is the third promotion'
};

const promotions: Map<string, Interfaces.Promotion> = new Map();
promotions.set(promotion_1.id, promotion_1);
promotions.set(promotion_2.id, promotion_2);
promotions.set(promotion_3.id, promotion_3);

const items: Map<string, Interfaces.Item> = new Map();
items.set(product_1.id, {
  ...product_1,
  quantity: 10
});
items.set(product_2.id, {
  ...product_2,
  quantity: 3
});
items.set(product_3.id, {
  ...product_3,
  quantity: 30
});

const data: Interfaces.State = {
  items: new Map<string, Interfaces.Item>(),
  products,
  promotions,
  discountCode: '',
  totalPrice: 0,
  updateItems: () => {
    return true;
  },
  updatePromotion: () => {
    return true;
  }
};

const getUpdateItems = (set: SetState<Interfaces.State>, get: GetState<Interfaces.State>) => (
  id: string,
  quantity: number
) => {
  const { items, products } = get();
  // product id selected exists
  const product = products.get(id);

  if (product) {
    if (quantity === 0) {
      items.delete(id);
      set({
        items
      });
    } else {
      items.set(id, {
        ...product,
        quantity
      });
      set({
        items
      });
    }
    return true;
  } else {
    return false;
  }
};

const getUpdatePromotion = (set: SetState<Interfaces.State>, get: GetState<Interfaces.State>) => (
  discountCode: string
) => {
  const { promotions } = get();
  const promotion = promotions.get(discountCode);

  // promotion id exists
  if (promotion) {
    set({
      discountCode
    });
    return true;
  } else {
    return false;
  }
};

/**
 * All products added to shopping cart (the "items" field is all given products) as React store hook
 */
const useStore = create<Interfaces.State>((set, get) => ({
  ...data,
  items,
  updateItems: getUpdateItems(set, get),
  updatePromotion: getUpdatePromotion(set, get)
}));

/**
 * All products added to shopping cart (the "items" field is all given products) as vanilla store
 */
const store = createVanilla<Interfaces.State>((set, get) => ({
  ...data,
  items,
  updateItems: getUpdateItems(set, get),
  updatePromotion: getUpdatePromotion(set, get)
}));

/**
 * Empty shopping cart items (the "items" field is empty Map) as vanilla store
 */
const emptyStore = createVanilla<Interfaces.State>((set, get) => ({
  ...data,
  items: new Map<string, Interfaces.Item>(),
  updateItems: getUpdateItems(set, get),
  updatePromotion: getUpdatePromotion(set, get)
}));

/**
 * Added discount code variable to a store as vanilla store
 */
const discountCode = createVanilla<Interfaces.State>((set, get) => ({
  ...data,
  discountCode: 'AAA',
  updateItems: getUpdateItems(set, get),
  updatePromotion: getUpdatePromotion(set, get)
}));

/**
 * Empty shopping cart items (the "items" field is empty Map) as React store hook
 */
const useEmptyStore = create<Interfaces.State>((set, get) => ({
  ...data,
  items: new Map<string, Interfaces.Item>(),
  updateItems: getUpdateItems(set, get),
  updatePromotion: getUpdatePromotion(set, get)
}));

/**
 * Added discount code variable to a store as React store hook
 */
const useDiscountStore = create<Interfaces.State>((set, get) => ({
  ...data,
  discountCode: 'AAA',
  updateItems: getUpdateItems(set, get),
  updatePromotion: getUpdatePromotion(set, get)
}));

export {
  products,
  items,
  promotions,
  useStore,
  useEmptyStore,
  useDiscountStore,
  store,
  emptyStore,
  discountCode
};
