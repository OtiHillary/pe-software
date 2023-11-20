import { configureStore } from '@reduxjs/toolkit'
import loggedReducer from './logged/loggedSlice'
import editGoalReducer from './goals/goalSlice'
import newGoalReducer from './goals/goalSlice'

export const store = configureStore({
    reducer: {
        logged: loggedReducer,
        newGoal: newGoalReducer,
        editGoal: editGoalReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;