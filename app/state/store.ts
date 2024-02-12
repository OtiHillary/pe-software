import { configureStore } from '@reduxjs/toolkit'
import loggedReducer from './logged/loggedSlice'
import goalReducer from './goals/goalSlice'
import notificationReducer from './notification/notificationSlice'
import setNotificationReducer from './setnotification/setNotificationSlice'
import actionReducer from './action/actionSlice'
import notificationSentReducer from './notificationsent/notificationSentSlice'
import roleCreatedReducer from './rolecreated/roleCreatedSlice'

export const store = configureStore({
    reducer: {
        logged: loggedReducer,
        goal: goalReducer,
        notification: notificationReducer,
        action: actionReducer,
        setNotification: setNotificationReducer,
        notificationSent: notificationSentReducer,
        roleCreated: roleCreatedReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;