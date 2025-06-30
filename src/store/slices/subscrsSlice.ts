import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Subscr } from '../../types/charges';
import { USER_LOCALSTORAGE_KEY } from '../../const/localStorage';

export interface SubscrsState {
  subscrs: Subscr[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscrsState = {
  subscrs: [],
  loading: false,
  error: null,
};

export const fetchSubscrs = createAsyncThunk<Subscr[], void, { rejectValue: string }>(
  'subscrs/fetchSubscrs',
  async (_, { rejectWithValue }) => {
    const ExtToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (!ExtToken) return rejectWithValue('Токен авторизации не найден');

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API}/Ext/GetSubscrsExt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ExtToken }),
      });
      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data.msg || 'Ошибка загрузки');
      }
      return data.results as Subscr[];
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Неизвестная ошибка');
    }
  }
);

const subscrsSlice = createSlice({
  name: 'subscrs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscrs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscrs.fulfilled, (state, action: PayloadAction<Subscr[]>) => {
        state.loading = false;
        state.subscrs = action.payload;
      })
      .addCase(fetchSubscrs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки';
      });
  },
});

export const { reducer: subscrsReducer } = subscrsSlice