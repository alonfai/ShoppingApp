import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import useStore from 'store';
import { Interfaces } from 'shared';

const Title = styled.h2``;

const ListWrapper = styled.ul``;

const ListItemWrapper = styled.li`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const EmptyList = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: red;
`;

export type ComponentProps = {};

export function convertItemsMapToArray(items: Map<string, Interfaces.Item>) {
  return Array.from(items.values());
}

const Cart: React.FC<ComponentProps> = () => {
  const items = convertItemsMapToArray(useStore(state => state.items));

  return (
    <Wrapper>
      <Title>Cart List</Title>
      {items.length === 0 ? (
        <EmptyList>No items have been added to the cart</EmptyList>
      ) : (
        <ListWrapper role='list'>
          {items.map(({ quantity, ...rest }) => (
            <ListItemWrapper key={rest.id}>
              <Item product={rest} quantity={quantity} />
            </ListItemWrapper>
          ))}
        </ListWrapper>
      )}
    </Wrapper>
  );
};

export default Cart;
