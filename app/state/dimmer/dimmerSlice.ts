import { createSlice } from '@reduxjs/toolkit'

type dimmerState = {
    visible: boolean;
}
const initialState: dimmerState = {
    visible: false,
}
const dimmerSlice = createSlice({
    name: 'logged',
    initialState,
    reducers:{
        dimmer: (state) => {
            state.visible = !state.visible
        },

    }
})

export const { dimmer } = dimmerSlice.actions
export default dimmerSlice.reducer