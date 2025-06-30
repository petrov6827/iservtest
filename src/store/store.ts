import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from './slices/loginSlice'
import { userReducer } from './slices/userSlice'
import chargesReducer from './slices/chargesSlice'
import subscrsReducer from './slices/subscrsSlice'

const store = configureStore({
  reducer: {
		user: userReducer,
		loginForm: loginReducer,
    subscrs: subscrsReducer,
    charges: chargesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store