import { configureStore } from '@reduxjs/toolkit'
import loggedReducer from './logged/loggedSlice'
import newGoalReducer from './goals/newgoalSlice'
import editGoalReducer from './goals/editgoalSlice'

export const store = configureStore({
    reducer: {
        logged: loggedReducer,
        newGoal: newGoalReducer,
        editGoal: editGoalReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;