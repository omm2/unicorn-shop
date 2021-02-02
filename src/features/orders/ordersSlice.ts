import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store'

export interface Order {
  id: number;
  date: number;
  productIds: Array<string>;
}

export interface OrdersState {
  data: Array<Order>;
  error: boolean;
}

const initialState: OrdersState = {
  data: [],
  error: false,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  // since we use immerjs this rule has to be disabled, see https://github.com/immerjs/immer/issues/189
  /* eslint-disable no-param-reassign */
  reducers: {
    addOrder: (state, { payload }: PayloadAction<Order>) => {
      state.data.push(payload)
    },
    setErrors: (state, { payload }: PayloadAction<boolean>) => {
      state.error = payload
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { addOrder, setErrors } = ordersSlice.actions;

export const createOrder = (productIds: Array<string>): AppThunk => {
  return dispatch => {
    try {
      const order: Order = {
        // mock for id generation
        id: Date.now(),
        date: Date.now(),
        productIds
      }
      dispatch(addOrder(order))
    } catch (error) {
      dispatch(setErrors(true))
    }
  }
}

export default ordersSlice.reducer;

export const ordersSelector = (state: { orders: OrdersState }) =>
  state.orders