import React from 'react';
import styled from 'styled-components';
import { usePriceDefault, usePrice } from 'shared';
import useStore from 'store';

const Title = styled.h2``;

const Wrapper = styled.div`
  width: 100%;
`;

const Sum = styled.p``;

export type ComponentProps = {};

const Total: React.FC<ComponentProps> = () => {
  const items = Array.from(useStore(state => state.items).values());
  const discountCode = useStore(state => state.discountCode);

  const defaultPrice = usePriceDefault(items).toFixed(2);
  const discountedPrice = usePrice(!!discountCode ? discountCode : '', items).toFixed(2);
  return (
    <Wrapper>
      <Title>Total cost</Title>
      <Sum data-testid='total'>${!!discountCode ? discountedPrice : defaultPrice}</Sum>
    </Wrapper>
  );
};

export default Total;
