/* eslint-disable import/no-extraneous-dependencies */
import React, { FC } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import { store } from './app/store';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </Provider>
  );
};

const customRender = (
  ui: React.ReactElement
) => render(ui, { wrapper: AllTheProviders });

export * from '@testing-library/react';

export { customRender as render };