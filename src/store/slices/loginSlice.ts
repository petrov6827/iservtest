import axios from 'axios';
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { USER_LOCALSTORAGE_KEY } from '../../const/localStorage';
import { userActions, type User } from './userSlice';

interface LoginByUsernameProps {
  Username: string;
  Password: string;
}

interface AuthResponse {
  success: boolean
  extToken?: string
  msg?: string
}

export interface LoginState {
  Username: string;
  Password: string;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  Username: '',
  Password: '',
  loading: false,
  error: null
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.Username = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.Password = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
  },
})

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  'login/loginByUsername',
  async ({ Username, Password }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const response = await axios.post<AuthResponse>(
        `${import.meta.env.VITE_APP_API}/Ext/LogOnExt`,
        { Username, Password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.data.success || !response.data.extToken) {
        const errorMessage = response.data.msg || 'Токен не был получен';
        return rejectWithValue(errorMessage);
      }

      const userData: User = { token: response.data.extToken };
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData));
      dispatch(userActions.setAuthData(userData));

      return userData
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          const responseData = e.response.data;
          const serverMessage =
            (typeof responseData === 'object' && responseData !== null)
              ? responseData.msg || responseData.message || responseData.error
              : e.response.statusText;
          return rejectWithValue(serverMessage || `Серверная ошибка: ${e.response.status}`);
        }
        return rejectWithValue(e.message || 'Ошибка сети');
      }
      return rejectWithValue('Неизвестная ошибка');
    }
  }
)

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice