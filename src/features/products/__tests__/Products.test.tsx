import React from 'react';
import { screen } from '@testing-library/react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import * as reactRedux from 'react-redux';
import { render, fireEvent } from '../../../test-utils';
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

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    render(<Products /> );
    expect(screen.getByText('Please choose your products')).toBeInTheDocument();
  });

  it('renders list of products', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce({ loading: false, error: false, data: productsJson })
      .mockReturnValueOnce({ token:'5e8c3c48-af49-425b-a6d9-f37f3511e4fa' });

    render(<Products />);

    expect(mockedDispatch).toHaveBeenCalled();
    const items = screen.queryAllByRole('gridcell');
    expect(items).toHaveLength(productsJson.length);
  });
});
