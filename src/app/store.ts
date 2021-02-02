import { configureStore, combineReducers, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import loginReducer, { LoginState } from '../features/login/loginSlice'
import productsReducer, { ProductsState } from '../features/products/productsSlice'
import ordersReducer, { OrdersState } from '../features/orders/ordersSlice'

// the solution to make redux-toolkit and redux-persist work together
// taken from here: https://github.com/reduxjs/redux-toolkit/issues/121
const reducers = combineReducers({
  login: loginReducer,
  products: productsReducer,
  orders: ordersReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'orders']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  // the solution is taken from here: https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
  devTools: process.env.NODE_ENV !== 'production',
})

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, LoginState, unknown, Action<string>>;

export {store, persistor}