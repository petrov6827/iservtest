import type { StateSchema } from '../StateSchema';

export const getUserAuthData = (state: StateSchema) => state.user.authData;