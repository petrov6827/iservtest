import type { Subscr } from '../types/charges';

export interface User {
	token: string;
}

export interface UserSchema {
	authData?: User
}

export interface ChargesShema {
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

export interface LoginSchema {
	Username: string;
	Password: string;
	isLoading: boolean;
	error: string | null;
}

export interface StateSchema {
	user: UserSchema;
	loginForm: LoginSchema;
	charges: ChargesShema;
	subscrs: {
		data: Subscr[];
		isLoading: boolean;
		error: string | null;
	};
}