import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './features/profileSlice'
import loginReducer from './features/loginSlice'
import registerReducer from './features/registerSlice'
import sendVerificationCodeReducer from './features/sendVerificationCodeSlice'
import verifyCodeUserReducer from './features/verifyCodeUserSlice'
import resetPasswordUserReducer from './features/resetPasswordSlice'
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    login: loginReducer,
    register: registerReducer,
    sendVerificationCode: sendVerificationCodeReducer,
    verifyCodeUser: verifyCodeUserReducer,
    resetPassword: resetPasswordUserReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch