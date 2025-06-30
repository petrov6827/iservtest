import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { UserState } from '../StateSchema';
import { ExtToken } from '../../const/localStorage';

const initialState: UserState = {
	id: null,
	username: null,
	token: localStorage.getItem(ExtToken),
	isLoading: false,
	error: null,
};

export const checkAuth = createAsyncThunk(
	'user/checkAuth',
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem(ExtToken);
			if (!token) {
				throw new Error('Не авторизован');
			}
			
			// TODO: Add API call to validate token
			return {
				id: '1', // Replace with actual user data
				username: 'user',
				token
			};
		} catch (error) {
			localStorage.removeItem(ExtToken);
			return rejectWithValue(error instanceof Error ? error.message : 'Ошибка авторизации');
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.id = null;
			state.username = null;
			state.token = null;
			localStorage.removeItem(ExtToken);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false;
				state.id = action.payload.id;
				state.username = action.payload.username;
				state.token = action.payload.token;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
				state.id = null;
				state.username = null;
				state.token = null;
			});
	},
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;