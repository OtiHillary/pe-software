import { createSlice } from '@reduxjs/toolkit'

type goalState = {
    visible: boolean;
}
const initialState: goalState = {
    visible: false,
}
const goalSlice = createSlice({
    name: 'logged',
    initialState,
    reducers:{
        newGoal: (state) => {
            state.visible = true
        },

    }
})

export const { newGoal } = goalSlice.actions
export default goalSlice.reducer