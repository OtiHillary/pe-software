import { configureStore } from '@reduxjs/toolkit'
import loggedReducer from './logged/loggedSlice'
import dimmerReducer from './dimmer/dimmerSlice'
import goalReducer from './goals/editgoalSlice'

export const store = configureStore({
    reducer: {
        logged: loggedReducer,
        goal: goalReducer,
        dimmer: dimmerReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;