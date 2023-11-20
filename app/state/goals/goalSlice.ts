import { createSlice } from '@reduxjs/toolkit'

type goalState = {
    new: boolean;
    edit: boolean;
}
const initialState: goalState = {
    new: false,
    edit: false,
}
const goalSlice = createSlice({
    name: 'logged',
    initialState,
    reducers:{
        newGoal: (state) => {
            state.new = !state.new
        },
        editGoal: (state) => {
            state.edit = !state.edit
        },

    }
})

export const { newGoal, editGoal } = goalSlice.actions
export default goalSlice.reducer