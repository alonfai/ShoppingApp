import React from 'react';
import styled from 'styled-components';
import { Products, Cart, Discounts, Total } from 'Components';
import { Styled } from 'shared';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Title = styled.h1`
  text-decoration: underline;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <Title>Checkout page</Title>
      <Products />
      <Styled.LineSepeartor role='separator' />
      <Cart />
      <Styled.LineSepeartor role='separator' />
      <Discounts />
      <Styled.LineSepeartor role='separator' />
      <Total />
    </Wrapper>
  );
};

export default App;
