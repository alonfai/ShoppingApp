import { useMemo } from 'react';
import { Interfaces } from 'shared';

const useCalcPricingOnCodeA: Interfaces.GetNewPriceAction = (
  code: string,
  items: Interfaces.Item[]
) => {
  const totalPricePreDiscount = useMemo(() => {
    if (code !== 'RRD4D32') {
      return 0;
    }
    return items.reduce((prev, next) => {
      return prev + next.price * next.quantity;
    }, 0);
  }, [code, items]);

  if (totalPricePreDiscount > 1000) {
    return totalPricePreDiscount * 0.9;
  }
  return totalPricePreDiscount;
};

const useCalcPricingOnCodeB: Interfaces.GetNewPriceAction = (
  code: string,
  items: Interfaces.Item[]
) => {
  const totalPricePreDiscount = useMemo(() => {
    if (code !== '44F4T11') {
      return 0;
    }
    return items.reduce((prev, next) => {
      return prev + next.price * next.quantity;
    }, 0);
  }, [code, items]);

  if (totalPricePreDiscount > 1500) {
    return totalPricePreDiscount * 0.85;
  }
  return totalPricePreDiscount;
};

const useCalcPriceOnCodeC: Interfaces.GetNewPriceAction = (
  code: string,
  items: Interfaces.Item[]
) => {
  return useMemo(() => {
    if (code !== 'FF9543D1') {
      return 0;
    }
    return items.reduce((prev, next) => {
      if (next.id !== 'docgen') {
        return prev + next.price * next.quantity;
      }
      // "docGen" document calculation
      if (next.quantity >= 10) {
        return prev + next.quantity * 8.99;
      }
      return prev + next.quantity * next.price;
    }, 0);
  }, [code, items]);
};

const useCalcPriceOnCodeD: Interfaces.GetNewPriceAction = (
  code: string,
  items: Interfaces.Item[]
) => {
  return useMemo(() => {
    if (code !== 'YYGWKJD') {
      return 0;
    }
    const workflowPurchased = !!items.find(item => item.id === 'wf');
    return items.reduce((prev, next) => {
      // "docGen" document calculation
      if (next.id === 'form' && workflowPurchased) {
        return prev + next.quantity * 89.99;
      }
      return prev + next.quantity * next.price;
    }, 0);
  }, [code, items]);
};

export const usePriceDefault: (items: Interfaces.Item[]) => number = items => {
  return useMemo(() => {
    return items.reduce((prev, next) => {
      return prev + next.price * next.quantity;
    }, 0);
  }, [items]);
};

/**
 * Get total price for the shopping cart using the given code. Any change to pricing should be dealt with inside and every pricing rule method should implement the interface of Interface.GetNewPriceAction
 * @param code code to use
 * @param items list of products in shopping cart
 */
const usePrice: Interfaces.GetNewPriceAction = (code, items) => {
  return (
    useCalcPricingOnCodeA(code, items) +
    useCalcPricingOnCodeB(code, items) +
    useCalcPriceOnCodeC(code, items) +
    useCalcPriceOnCodeD(code, items)
  );
};
export default usePrice;
