import React from 'react';
import { screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { render } from '../../../test-utils';
import ordersJson from './orders.json';

import Orders from '../Orders';


describe('Orders', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const ordersData = { data: ordersJson };

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders list of orders', () => {
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce(ordersData);

    render(<Orders />);

    const items = screen.queryAllByTestId('row');
    expect(items).toHaveLength(ordersJson.length);
  });
});
