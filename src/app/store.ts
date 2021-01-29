import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import loginReducer, { LoginState } from '../features/login/loginSlice'
import productsReducer, { ProductsState } from '../features/products/productsSlice'

const store  = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, LoginState, unknown, Action<string>>;

export default store