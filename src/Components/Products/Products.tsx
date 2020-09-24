import React from 'react';
import ListItem from './ListItem';
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

const EmptyProductList = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: red;
`;

export type ComponentProps = {};

const Products: React.FC<ComponentProps> = () => {
  const products = useStore(state => state.products);
  const itemsLength = useStore(state => Array.from(state.items.keys()).length);

  return (
    <Wrapper>
      <Title>Products List</Title>
      {itemsLength === Array.from(products.keys()).length ? (
        <EmptyProductList>All products have been added to the cart</EmptyProductList>
      ) : (
        <ListWrapper role='list'>
          {Array.from(products.values()).map(product => (
            <ListItemWrapper key={product.id}>
              <ListItem product={product} />
            </ListItemWrapper>
          ))}
        </ListWrapper>
      )}
    </Wrapper>
  );
};

export default Products;
