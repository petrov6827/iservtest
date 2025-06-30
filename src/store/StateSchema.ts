import type { Charge, Subscr } from '../types/charges';

export interface UserState {
	id: string | null;
	username: string | null;
	token: string | null;
	isLoading: boolean;
	error: string | null;
}

export interface ChargesState {
	data: Subscr[];
	isLoading: boolean;
	error: string | null;
	filters: {
		fromYear: number;
		fromMonth: number;
		toYear: number;
		toMonth: number;
	};
}

export interface LoginFormState {
	username: string;
	password: string;
	isLoading: boolean;
	error: string | null;
}

export interface StateSchema {
	user: UserState;
	loginForm: LoginFormState;
	charges: ChargesState;
	subscrs: {
		data: Subscr[];
		isLoading: boolean;
		error: string | null;
	};
}