import { configureStore, createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: false,
    reducers: {
        toggleModal(state) {
            return !state
        }
    }
})

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer
    }
})

export const modalAction = modalSlice.actions
export default store