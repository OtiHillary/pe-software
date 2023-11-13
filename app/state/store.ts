import { configureStore } from '@reduxjs/toolkit'
import loggedReducer from './logged/loggedSlice'

export const store = configureStore({
    reducer: {
        logged: loggedReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;