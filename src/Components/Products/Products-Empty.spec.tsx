import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { mocks } from 'mocks';
import Products from './Products';

/**
 * Mock the store with an empty list of items. This was due to be unable to create separate mocks for both empty and a full shopping cart in the same spec.tsx file (see: Products-Full.spec.tsx for its related test case)
 */
jest.mock('store', () => mocks.useEmptyStore);

describe('components/Products-Empty', () => {
  let renderResult: RenderResult;

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('render successfully', () => {
    renderResult = render(<Products />);
    const titleElement = renderResult.getByText('Products List');
    expect(titleElement).toBeInTheDocument();
    const listWrapperElement = renderResult.queryByRole('list');
    expect(listWrapperElement).toBeInTheDocument();
    expect(listWrapperElement?.childElementCount).toEqual(mocks.items.size);
  });
});
