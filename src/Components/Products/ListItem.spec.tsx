import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocks } from 'mocks';
import { Interfaces } from 'shared';
import ListItem from './ListItem';

/**
 * Mock the store with empty shopping cart
 */
jest.mock('store', () => mocks.useEmptyStore);

describe('components/Products/ListItem', () => {
  let renderResult: RenderResult;

  const product: Interfaces.Product = Array.from(mocks.products.values())[0];

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('render successfully', () => {
    renderResult = render(<ListItem product={product} />);
    const productIdField = renderResult.getByText(`Product ID: ${product.id}`);
    expect(productIdField).toBeInTheDocument();
    const productNameField = renderResult.getByText(`Product Name: ${product.name}`);
    expect(productNameField).toBeInTheDocument();
    const productPriceField = renderResult.getByText(`Price: ${product.price}`);
    expect(productPriceField).toBeInTheDocument();
  });

  it('add product to cart', () => {
    renderResult = render(<ListItem product={product} />);
    let { container } = renderResult;
    expect(container).not.toBeEmptyDOMElement();
    const addButton = renderResult.getByText('Add product to cart');
    expect(addButton).toBeInTheDocument();
    userEvent.click(addButton);
    container = renderResult.container;
    expect(container).toBeEmptyDOMElement();
  });
});
