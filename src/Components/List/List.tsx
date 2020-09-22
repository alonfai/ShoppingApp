import React from 'react';
import { ListItem } from 'Components';
import styled from 'styled-components';
import useStore from 'store';

const Title = styled.h2``;

const ListWrapper = styled.ul`
  list-style-type: none;
`;

const ListItemWrapper = styled.li`
  float: left;
`;

const Wrapper = styled.div`
  width: 100%;
`;

export type ComponentProps = {};

const List: React.FC<ComponentProps> = () => {
  const products = useStore(store => store.products);
  return (
    <Wrapper>
      <Title>Products List</Title>
      <ListWrapper role='list'>
        {Array.from(products.values()).map(product => (
          <ListItemWrapper key={product.id}>
            <ListItem key={product.id} product={product} />
          </ListItemWrapper>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default List;
