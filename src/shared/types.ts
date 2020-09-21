/**
 * Type description of a product in the system
 */
export interface Product {
  /**
   * Unique identifer for the product
   */
  id: string;
  /**
   * Name for the product
   */
  name: string;
  /**
   * given price for the product
   */
  price: number;
}

/**
 * Promotion information on a product
 */
export interface Promotion {
  /**
   * Unique promotion code
   */
  id: string;
  /**
   * Text describing the promotion for the product
   */
  description: string;
}

/**
 * Data store type
 */
export type State = {
	/**
	 * list of all products in the cart, keyed by the product id and value as number of units been bought for that product
	 */
  products: {
		[id: string]: number
	};
	/**
	 * list of all promotional ids
	 */
	promotions: Set<string>;
	/**
	 * Update cart with given product id and number of units for that product. Returns true/false on completion
	 */
	updateProducts: (id: string, quantity: number) => boolean;
	/**
	 * Adds new promotional id to the checkout page. Returns true/false on completion
	 */
	addPromotion: (id: string) => boolean;
	/**
	 * Remove the promotional id from the checkout page. Returns true/false on completion
	 */
	removePromotion: (id: string) => boolean;
};
