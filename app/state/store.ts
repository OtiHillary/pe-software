import { configureStore } from '@reduxjs/toolkit'
import loggedReducer from './logged/loggedSlice'
import goalReducer from './goals/goalSlice'
import notificationReducer from './notification/notificationSlice'
import actionReducer from './action/actionSlice'
export const store = configureStore({
    reducer: {
        logged: loggedReducer,
        goal: goalReducer,
        notification: notificationReducer,
        action: actionReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;