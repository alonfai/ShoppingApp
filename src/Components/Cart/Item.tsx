import React from 'react';
import styled from 'styled-components';
import { Interfaces } from 'shared';
import useStore from 'store';

const Info = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Button = styled.button``;

export type ComponentProps = {
  product: Interfaces.Product;
  quantity: number;
};

const Item: React.FC<ComponentProps> = ({ product, quantity }) => {
  const updateItems = useStore(state => state.updateItems);

  const onAdd = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateItems(product.id, quantity + 1);
  };

  const onRemove = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateItems(product.id, Math.max(quantity - 1, 0));
  };

  return (
    <>
      <Info aria-label='Name'>Name: {product.name}</Info>
      <Info aria-label='Price'>Price: {product.price}</Info>
      <Button aria-label='remove 1 item' onClick={onRemove}>
        -
      </Button>
      <Info>Quantity: {quantity}</Info>
      <Button aria-label='add 1 item' onClick={onAdd}>
        +
      </Button>
    </>
  );
};

export default Item;
