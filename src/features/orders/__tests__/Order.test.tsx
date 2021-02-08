import React from 'react';
import { screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { render } from '../../../test-utils';
import ordersJson from './orders.json';
import Order from '../Order';
import { getTotal } from '../../../utils';

function formatPrice(num: number) {
  const formatted = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return `€${formatted}`;
}

describe('Order', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const orderData = ordersJson[0];

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders list of orders', () => {
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce(orderData);

    render(<Order />);
    expect(screen.getByText(`Order #${orderData.id}`)).toBeInTheDocument();

    orderData.products.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    const total = getTotal(orderData.products);

    expect(screen.getByText(formatPrice(total))).toBeInTheDocument();
  });
});
