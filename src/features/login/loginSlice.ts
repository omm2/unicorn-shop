import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../app/store';
import { baseURL } from '../../constants';

export interface UserData {
  user: string;
  password: string;
}

export interface LoginState {
  token: string;
  loading: boolean;
  error: boolean;
}

const initialState: LoginState = {
  token: '',
  loading: false,
  error: false
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  // since we use immerjs this rule has to be disabled, see https://github.com/immerjs/immer/issues/189
  /* eslint-disable no-param-reassign */
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setErrors: (state, { payload }: PayloadAction<boolean>) => {
      state.error = payload;
    },

    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    }
  }
  /* eslint-enable no-param-reassign */
});

export const { setLoading, setErrors, setToken } = loginSlice.actions;

export const login = (user: UserData): AppThunk => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        `${baseURL}/login`, user
      );

      dispatch(setLoading(false));
      dispatch(setToken(res.data.token));
    } catch (error) {
      dispatch(setErrors(true));
      dispatch(setLoading(false));
    }
  };
};

export default loginSlice.reducer;

export const loginSelector = (state: { login: LoginState }) =>
  state.login;
