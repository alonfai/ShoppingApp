import React from 'react';
import styled from 'styled-components';
import Cart from 'Components/Cart';

const Wrapper = styled.main`
  margin: 0px auto;
  padding-top: 20px;
`;

const Title = styled.h1``;

const App: React.FC = () => {
  return (
    <Wrapper>
      <Title>Checkout page</Title>
      <Cart />
    </Wrapper>
  );
};

export default App;
