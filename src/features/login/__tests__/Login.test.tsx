import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import * as reactRouterDom from 'react-router-dom';
import { render } from '../../../test-utils';

import Login from '../Login';

describe('Products', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    useLocationMock.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it.only('should render and submit', async () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce({ token: '' });
    (useLocationMock as jest.Mock)
      .mockReturnValueOnce({ from: { pathname: '/' } });
    const userData = {
      user: 'user@choco.com',
      password: 'chocorian'
    };
    render(<Login /> );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();

    const emailInput = screen.getByLabelText('email-input');
    const passwordInput = screen.getByLabelText('password-input');

    fireEvent.change(emailInput, { target: { value: userData.user } });
    fireEvent.change(passwordInput, { target: { value: userData.password } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(mockedDispatch).toHaveBeenCalled());
  });
});
