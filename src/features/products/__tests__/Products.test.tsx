import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import * as reactRedux from 'react-redux';
import { render } from '../../../test-utils';
import productsJson from './products.json';

import Products from '../Products';

// mock with msw library doesn't work, gives an error:
// Error: Headers x-msw-request-id forbidden
/*
const server = setupServer(
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json({ token: 'mocked_user_token' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
*/


describe('Products', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const productData = { loading: false, error: false, data: productsJson };
  const loginData = { token:'5e8c3c48-af49-425b-a6d9-f37f3511e4fa' };

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders list of products', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce(productData)
      .mockReturnValueOnce(loginData);

    render(<Products />);

    expect(mockedDispatch).toHaveBeenCalled();
    const items = screen.queryAllByRole('gridcell');
    expect(items).toHaveLength(productsJson.length);
  });

  it('toggles one item and creats order', async () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    (useSelectorMock as jest.Mock)
    // TODO mock multiple requests in some better way
      .mockReturnValueOnce(productData)
      .mockReturnValueOnce(loginData)
      .mockReturnValueOnce(productData)
      .mockReturnValueOnce(loginData)
      .mockReturnValueOnce(productData)
      .mockReturnValueOnce(loginData)
      .mockReturnValueOnce(productData)
      .mockReturnValueOnce(loginData);

    render(<Products />);

    const buttons = screen.getAllByText('Select');

    // Click Select button
    fireEvent.click(buttons[0]);

    expect(screen.getByTestId('counter')).toHaveTextContent('1');
    const unselectedItems = screen.queryAllByTestId('unselected');
    expect(unselectedItems).toHaveLength(9);
    const selectedItems = screen.queryAllByTestId('selected');
    expect(selectedItems).toHaveLength(1);

    // Click Create Order button
    fireEvent.click(screen.getByText('Create an order'));

    expect(screen.getByText('Are you sure you want to create an order?')).toBeInTheDocument();

    // Click Ok button
    fireEvent.click(screen.getByText('OK'));

    await waitFor(() => expect(mockedDispatch).toHaveBeenCalled());
  });
});
