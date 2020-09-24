import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { mocks } from 'mocks';
import Total from './Total';

/**
 * Mock the store with a discount code applied. This was due to be unable to create separate mocks for all options in the same spec.tsx file (see: Total-Full.spec.tsx and Total-Empty.spec.tsx for its related test case)
 */
jest.mock('store', () => mocks.useDiscountStore);

describe('components/Total-DiscountCode', () => {
  let renderResult: RenderResult;

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('render successfully', () => {
    renderResult = render(<Total />);
    const titleElement = renderResult.getByText('Total cost');
    expect(titleElement).toBeInTheDocument();
    const totalElement = renderResult.getByTestId('total');
    expect(totalElement).toBeInTheDocument();
    const value = parseFloat(totalElement.textContent?.substr(1) ?? '0');
    expect(value).toEqual(0);
  });
});
