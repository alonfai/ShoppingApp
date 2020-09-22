import React, { useState } from 'react';
import useStore from 'store';
import styled from 'styled-components';
// import useStore from 'store';

const Title = styled.h2``;

const Wrapper = styled.div`
  width: 100%;
`;

const CodeInput = styled.input`
  margin-right: 1rem;
`;

const ValidCodesContainer = styled.p`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const ApplyCodeButton = styled.button``;

const ValidCodesTextHolder = styled.span`
  margin-bottom: 1rem;
`;

export type ComponentProps = {};

const Discounts: React.FC<ComponentProps> = () => {
  const promotionList = useStore(store => store.promotions);
  const addDiscount = useStore(store => store.addDiscount);
  const discounts = useStore(store => store.discounts);
  const [input, setInput] = useState('');

  const onChangeCode = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onApplyCode = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (discounts.has(input)) {
      alert('Your code has already been applied');
    } else if (promotionList.has(input)) {
      addDiscount(input);
      alert('Your code has been added');
    } else {
      alert('Your code is invalid');
    }
    setInput('');
  };

  return (
    <Wrapper>
      <Title>Promotions</Title>
      {/* {products} */}
      <CodeInput value={input} onChange={onChangeCode} />
      <ApplyCodeButton onClick={onApplyCode}>Apply code</ApplyCodeButton>
      <ValidCodesContainer role='group' aria-labelledby='validCodes'>
        <ValidCodesTextHolder id='validCodes'>Applied code list: </ValidCodesTextHolder>
        {Array.from(discounts.values()).join(', ')}
      </ValidCodesContainer>
    </Wrapper>
  );
};

export default Discounts;
