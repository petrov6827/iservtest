import type { ChargesState } from './slices/chargesSlice';
import type { LoginState } from './slices/loginSlice';
import type { SubscrsState } from './slices/subscrsSlice';
import type { UserState } from './slices/userSlice';

export interface StateSchema {
  user: UserState;
  loginForm: LoginState;
  charges: ChargesState;
  subscrs: SubscrsState;
}