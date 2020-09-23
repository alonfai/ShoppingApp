import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { mocks } from 'mocks';
import App from './App';

/**
 * Mock the store with empty shopping cart
 */
jest.mock('store', () => mocks.useEmptyStore);

describe('App', () => {
  let renderResult: RenderResult;

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('render successfully', () => {
    renderResult = render(<App />);
    const titleElement = renderResult.getByText('Checkout page');
    expect(titleElement).toBeInTheDocument();
    const seperators = renderResult.queryAllByRole('separator');
    expect(seperators.length).toEqual(3);
  });
});
