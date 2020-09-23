import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocks } from 'mocks';
import Discounts from './Discounts';

jest.mock('store', () => {
  return mocks.useStore;
});

describe('components/Discounts', () => {
  let renderResult: RenderResult;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('render successfully', () => {
    renderResult = render(<Discounts />);
    const appliedCodeElement = renderResult.getByTestId('appliedCode');
    expect(appliedCodeElement).toBeInTheDocument();
    expect(appliedCodeElement).toBeEmptyDOMElement();
  });

  it('check user code input', async () => {
    renderResult = render(<Discounts />);
    const inputElement = renderResult.getByTestId('productCode');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.textContent).toEqual('');
    const text = 'ABCD12';
    await userEvent.type(inputElement, text);
    expect(inputElement).toHaveValue(text);
  });

  describe('check apply code button', () => {
    it('invalid code', async () => {
      renderResult = render(<Discounts />);
      // type in code
      const inputElement = renderResult.getByTestId('productCode');
      expect(inputElement).toBeInTheDocument();
      const text = 'ABCD12';
      await userEvent.type(inputElement, text);
      // apply the click event
      const btnElement = renderResult.getByText('Apply code');
      expect(btnElement).toBeInTheDocument();
      userEvent.click(btnElement);
      // validate the code was not applied
      const appliedCodeElement = renderResult.getByTestId('appliedCode');
      expect(appliedCodeElement).toBeInTheDocument();
      expect(appliedCodeElement).toBeEmptyDOMElement();
    });

    it('valid code', async () => {
      renderResult = render(<Discounts />);
      // type in code
      const inputElement = renderResult.getByTestId('productCode');
      expect(inputElement).toBeInTheDocument();
      const code = Array.from(mocks.store.getState().promotions.values())[0].id;
      await userEvent.type(inputElement, code);
      // apply the click event
      const btnElement = renderResult.getByText('Apply code');
      expect(btnElement).toBeInTheDocument();
      userEvent.click(btnElement);
      // validate the code has been applied successfully
      const appliedCodeElement = renderResult.getByTestId('appliedCode');
      expect(appliedCodeElement).toBeInTheDocument();
      expect(appliedCodeElement.textContent).toEqual(`${code} has been applied`);
    });
  });
});
