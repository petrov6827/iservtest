import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Charge } from '../../types/charges';
import { USER_LOCALSTORAGE_KEY } from '../../const/localStorage';
import { getInitialPeriod, formatPeriodForAPI } from '../../utils/dateUtils';

const period = getInitialPeriod();

export interface ChargesState {
  fromMonth: number;
  fromYear: number;
  toMonth: number;
  toYear: number;
  charges: Charge[];
  loading: boolean;
  error: string | null;
}

const initialState: ChargesState = {
  fromMonth: period.start.month() + 1,
  fromYear: period.start.year(),
  toMonth: period.end.month() + 1,
  toYear: period.end.year(),
  charges: [],
  loading: false,
  error: null,
};

export const fetchCharges = createAsyncThunk<
  Charge[],
  void,
  { state: { charges: ChargesState }, rejectValue: string }
>(
  'charges/fetchCharges',
  async (_, { getState, rejectWithValue }) => {
    const { fromMonth, fromYear, toMonth, toYear } = getState().charges;
    const ExtToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (!ExtToken) return rejectWithValue('Токен авторизации не найден');

    const { PeriodBegin, PeriodEnd } = formatPeriodForAPI(fromMonth, fromYear, toMonth, toYear)

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API}/Ext/GetChargesExt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ExtToken, PeriodBegin, PeriodEnd }),
      });
      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data.msg || 'Ошибка загрузки');
      }
      return data.results as Charge[];
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Неизвестная ошибка');
    }
  }
);

const chargesSlice = createSlice({
  name: 'charges',
  initialState,
  reducers: {
    setFromMonth(state, action: PayloadAction<number>) {
      state.fromMonth = action.payload;
    },
    setFromYear(state, action: PayloadAction<number>) {
      state.fromYear = action.payload;
    },
    setToMonth(state, action: PayloadAction<number>) {
      state.toMonth = action.payload;
    },
    setToYear(state, action: PayloadAction<number>) {
      state.toYear = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharges.fulfilled, (state, action) => {
        state.loading = false;
        state.charges = action.payload;
      })
      .addCase(fetchCharges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки';
      });
  },
});

export const { setFromMonth, setFromYear, setToMonth, setToYear } = chargesSlice.actions;
export const { reducer: chargesReducer } = chargesSlice;