import { createSlice } from '@reduxjs/toolkit'

type goalState = {
    visible: boolean;
    info: {};
}
const initialState: goalState = {
    visible: false,
    info: {}
}
const goalSlice = createSlice({
    name: 'logged',
    initialState,
    reducers:{
        editGoal: (state, payload) => {
            state.visible = true
            state.info = payload
        },
    }
})

export const { editGoal } = goalSlice.actions
export default goalSlice.reducer
