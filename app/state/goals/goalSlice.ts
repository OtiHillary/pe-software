import { createSlice } from '@reduxjs/toolkit'

type goal = {
    name: string;
    status: any;
    description: string;
    daysLeft: any
}

type goalState = {
    new: boolean;
    edit: {
        visible: boolean;
        data: goal;
    };
    delete: boolean;
}


const initialState: goalState = {
    new: false,
    edit: {
        visible: false,
        data: {
            name: '',
            status: 0,
            description: '',
            daysLeft: 0 
        },
    },
    delete: false

}
const goalSlice = createSlice({
    name: 'goalActions',
    initialState,
    reducers:{
        newGoal: (state) => {
            state.new = !state.new
        },
        editGoal: (state, data) => {
            state.edit.visible = !state.edit.visible
            if(state.edit.visible) state.edit.data = data.payload
        },
        deleteGoal: (state) => {
            state.delete = !state.delete
            state.edit.visible = !state.edit.visible
        },
        cancelDelete: (state) => {
            state.delete = !state.delete
        }

    }
})

export const { newGoal, editGoal, deleteGoal, cancelDelete } = goalSlice.actions
export default goalSlice.reducer