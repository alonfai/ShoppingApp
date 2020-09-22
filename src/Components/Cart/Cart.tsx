import React from 'react';
import styled from 'styled-components';
import { Item } from 'Components';
import useStore from 'store';

const Title = styled.h2``;

const ListWrapper = styled.ul``;

const ListItemWrapper = styled.li`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  width: 100%;
`;

export type ComponentProps = {};

const Cart: React.FC<ComponentProps> = () => {
  const selectedItems = Array.from(useStore(state => state.items).values());

  return (
    <Wrapper>
      <Title>Cart List</Title>
      <ListWrapper role='list'>
        {selectedItems.length === 0 && <span>No items have been added to the cart</span>}
        {selectedItems.map(({ quantity, ...rest }) => (
          <ListItemWrapper key={rest.id}>
            <Item product={rest} quantity={quantity} />
          </ListItemWrapper>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default Cart;
