import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { mocks } from 'mocks';
import Total from './Total';

/**
 * Mock the store with an empty shopping cart. This was due to be unable to create separate mocks for both empty and a full shopping cart in the same spec.tsx file (see: Total-Full.spec.tsx for its related test case)
 */
jest.mock('store', () => mocks.useEmptyStore);

describe('components/Total-Empty', () => {
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
