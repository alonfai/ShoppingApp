import React, { useState } from 'react';
import useStore from 'store';
import styled from 'styled-components';

const Title = styled.h2``;

const Wrapper = styled.div`
  width: 100%;
`;

const CodeLabel = styled.label``;

const CodeInput = styled.input`
  margin-right: 1rem;
`;

const ValidCodesContainer = styled.p`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const ApplyCodeButton = styled.button``;

export type ComponentProps = {};

const Discounts: React.FC<ComponentProps> = () => {
  const promotionList = useStore(state => state.promotions);
  const updatePromotion = useStore(state => state.updatePromotion);
  const discountCode = useStore(state => state.discountCode);
  const [input, setInput] = useState('');

  const onChangeCode = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onApplyCode = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (promotionList.has(input)) {
      updatePromotion(input);
      alert('Your code has been applied and price been adjusted');
    } else {
      alert('Your code is invalid');
    }
    setInput('');
  };

  return (
    <Wrapper>
      <Title>Promotions</Title>
      {/* {products} */}
      <CodeLabel htmlFor='productCode' aria-label='promotional code'>
        Promotional code:{' '}
      </CodeLabel>
      <CodeInput id='productCode' data-testid='productCode' value={input} onChange={onChangeCode} />
      <ApplyCodeButton onClick={onApplyCode}>Apply code</ApplyCodeButton>
      <ValidCodesContainer data-testid='appliedCode' role='group' aria-label='Applied code: '>
        {discountCode && `${discountCode} has been applied`}
      </ValidCodesContainer>
    </Wrapper>
  );
};

export default Discounts;
