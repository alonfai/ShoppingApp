import React from 'react';
import styled from 'styled-components';
import { Products, Cart, Discounts, Total } from 'Components';

const LineSepeartor = styled.hr`
	width: 100%;
`;

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
      <LineSepeartor role='separator' />
      <Cart />
      <LineSepeartor role='separator' />
      <Discounts />
      <LineSepeartor role='separator' />
      <Total />
    </Wrapper>
  );
};

export default App;
