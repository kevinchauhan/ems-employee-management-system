import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: null,
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state, action) {
            return null
        }
    }
})

const roleSlice = createSlice({
    name: 'role',
    initialState: 'employee',
    reducers: {
        setRole(state, action) {
            return action.payload
        }
    }
})

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
        auth: authSlice.reducer,
        role: roleSlice.reducer,
        modal: modalSlice.reducer
    }
})

export const authAction = authSlice.actions
export const roleAction = roleSlice.actions
export const modalAction = modalSlice.actions
export default store