import React from 'react';
import { Product } from 'shared/types';

export type ComponentProps = {
  product: Product;
  quantity: number;
};

const ListItem: React.FC<ComponentProps> = () => null;

export default ListItem;
