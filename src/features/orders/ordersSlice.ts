import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { Product } from '../products/productsSlice';

export interface Order {
  id: number;
  date: number;
  products: Array<Product>;
}

export interface OrdersState {
  data: Array<Order>;
  error: boolean;
}

const initialState: OrdersState = {
  data: [],
  error: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  // since we use immerjs this rule has to be disabled, see https://github.com/immerjs/immer/issues/189
  /* eslint-disable no-param-reassign */
  reducers: {
    addOrder: (state, { payload }: PayloadAction<Order>) => {
      state.data.push(payload);
    },
    setErrors: (state, { payload }: PayloadAction<boolean>) => {
      state.error = payload;
    }
  }
  /* eslint-enable no-param-reassign */
});

export const { addOrder, setErrors } = ordersSlice.actions;

export const createOrder = (products: Array<Product>): AppThunk => {
  return dispatch => {
    try {
      const order: Order = {
        // mock for id generation
        id: Date.now(),
        date: Date.now(),
        // usually I would put only product ids into local storage
        // but here we need product data to display on order page
        products
      };
      dispatch(addOrder(order));
    } catch (error) {
      dispatch(setErrors(true));
    }
  };
};

export default ordersSlice.reducer;

export const ordersSelector = (state: { orders: OrdersState }) =>
  state.orders;