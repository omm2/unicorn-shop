import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk } from '../../app/store'

export interface Product {
  description: string;
  guid: string;
  name: string;
  picture: string;
  price: number;
}

export interface ProductsState {
  data: Array<Product>;
  loading: boolean;
  error: boolean;
}

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: false,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  // since we use immerjs this rule has to be disabled, see https://github.com/immerjs/immer/issues/189
  /* eslint-disable no-param-reassign */
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },

    setErrors: (state, { payload }: PayloadAction<boolean>) => {
      state.error = payload
    },

    setData: (state, { payload }: PayloadAction<Array<Product>>) => {
      state.data = payload
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { setLoading, setErrors, setData } = productsSlice.actions;

export const fetchProducts = (token: string): AppThunk => {
  return async dispatch => {
    dispatch(setLoading(true))
    try {
      const baseURL: string = 'https://glc4swy1fd.execute-api.eu-west-1.amazonaws.com/choco'
      const res = await axios.get(
        `${baseURL}/products?token=${token}`
      )

      dispatch(setLoading(false))
      dispatch(setData(res.data))
    } catch (error) {
      dispatch(setErrors(true))
      dispatch(setLoading(false))
    }
  }
}

export default productsSlice.reducer;

export const productsSelector = (state: { products: ProductsState }) =>
  state.products