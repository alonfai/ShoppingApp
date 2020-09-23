import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { mocks } from 'mocks';
import Cart, { convertItemsMapToArray } from './Cart';
import store from 'store';

jest.mock('store', () => jest.fn());

describe('components/Cart', () => {
  let renderResult: RenderResult;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('render successfully', () => {
    (store as any).mockImplementation(() => {
      return mocks.items;
    });

    renderResult = render(<Cart />);
    const headerElement = renderResult.getByText('Cart List');
    expect(headerElement).toBeInTheDocument();
    const itemsList = renderResult.getByRole('list');
    expect(itemsList).toBeInTheDocument();
    const listItems = renderResult.queryAllByRole('listitem');
    expect(listItems.length).toEqual(mocks.items.size);
  });

  it('convertItemsMapToArray', () => {
    const { items } = mocks;
    const result = convertItemsMapToArray(items);
    expect(result).toEqual(Array.from(items.values()));
  });

  it('render empty text if list is empty', () => {
    (store as any).mockImplementation(() => {
      return [];
    });

    renderResult = render(<Cart />);
    const itemsList = renderResult.queryByRole('list');
    expect(itemsList).not.toBeInTheDocument();
    const emptyListTitle = renderResult.getByText('No items have been added to the cart');
    expect(emptyListTitle).toBeInTheDocument();
  });
});
