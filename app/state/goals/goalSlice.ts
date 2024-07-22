import { createSlice } from '@reduxjs/toolkit'

type goal = {
    name: string
    day_started: string
    description:string
    due_date: string
    id: number
    status: number
    user_id:string
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
            day_started: '',
            due_date: '',
            id: 0,
            user_id: ''
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
        editGoal: (state, { payload }) => {
            console.log('the payload is: ',payload)
            state.edit.visible = !state.edit.visible
            if(state.edit.visible) state.edit.data = payload.payload
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