import React from 'react';
// import useStore from 'store';
// import { ListItem } from 'Components';
import styled from 'styled-components';
// import useStore from 'store';

const Title = styled.h2``;

const Wrapper = styled.div`
  width: 100%;
`;

export type ComponentProps = {};

const Total: React.FC<ComponentProps> = () => {
  // const { promotions, products } = useStore();

  // for (const promotionKey of promotions.keys()) {
  //   // switch (promotionKey) {
  //   //   case ''
  //   // }
  // }

  return (
    <Wrapper>
      <Title>Summary</Title>
    </Wrapper>
  );
};

export default Total;
