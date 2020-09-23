import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Interfaces } from 'shared';
import Item from './Item';

const mockUpdatedItems = jest.fn((id: string, quantity: number) => {
  return true;
});
jest.mock('store', () => {
  const useStore = () => {
    return mockUpdatedItems;
  };
  return useStore;
});

describe('components/Cart/Item', () => {
  let renderResult: RenderResult;
  const product: Interfaces.Product = {
    id: '1',
    name: 'custom product 1',
    price: 50
  };
  const quantity = 10;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('render successfully', () => {
    renderResult = render(<Item product={product} quantity={quantity} />);
    const nameElement = renderResult.getByText(`Name: ${product.name}`);
    expect(nameElement).toBeInTheDocument();
    const priceElement = renderResult.getByText(`Price: ${product.price}`);
    expect(priceElement).toBeInTheDocument();
    const quantityInput = renderResult.getByText(`Quantity: ${quantity}`);
    expect(quantityInput).toBeInTheDocument();
  });

  it('increment the quantity of the product', async () => {
    renderResult = render(<Item product={product} quantity={quantity} />);
    const decButton = renderResult.getByRole('button', { name: 'remove 1 item' });
    expect(decButton).toBeInTheDocument();
    userEvent.click(decButton, {});

    expect(mockUpdatedItems).toHaveBeenCalled();
    expect(mockUpdatedItems).toHaveBeenCalledTimes(1);
  });

  it('decrease the quantity of the product', async () => {
    renderResult = render(<Item product={product} quantity={quantity} />);
    const decButton = renderResult.getByRole('button', { name: 'add 1 item' });
    expect(decButton).toBeInTheDocument();
    userEvent.click(decButton);

    expect(mockUpdatedItems).toHaveBeenCalled();
    expect(mockUpdatedItems).toHaveBeenCalledTimes(1);
  });
});
