import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import loggedReducer from './logged/loggedSlice'
import goalReducer from './goals/goalSlice'

export const store = configureStore({
    reducer: {
        logged: loggedReducer,
        goal: goalReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;