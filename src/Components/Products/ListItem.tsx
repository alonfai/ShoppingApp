import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Interfaces } from 'shared';
import useStore from 'store';

const Info = styled.span`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const AddButton = styled.button``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  margin: 1rem;
  width: 300px;
  border: 1px solid grey;
`;

export type ComponentProps = {
  product: Interfaces.Product;
};

const ListItem: React.FC<ComponentProps> = ({ product }) => {
  const updateItems = useStore(state => state.updateItems);
  const itemAdded = useStore(useCallback(state => state.items.has(product.id), [product]));

  const onQuantityChange = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateItems(product.id, 1);
  };
  return itemAdded ? null : (
    <Wrapper>
      <Info>Product ID: {product.id}</Info>
      <Info>Product Name: {product.name}</Info>
      <Info>Price: {product.price}</Info>
      <AddButton onClick={onQuantityChange} aria-label='add product to cart'>
        Add product to cart
      </AddButton>
    </Wrapper>
  );
};

export default ListItem;
