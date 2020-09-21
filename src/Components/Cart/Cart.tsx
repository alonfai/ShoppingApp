import React from 'react';
import styled from 'styled-components';
import List from 'Components/List';
import Discounts from 'Components/Discounts';
import Total from 'Components/Total';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

export type ComponentProps = {};

const Cart: React.FC<ComponentProps> = () => {
  return (
    <Container>
      <List />
      <Discounts />
      <Total />
    </Container>
  );
};

export default Cart;
