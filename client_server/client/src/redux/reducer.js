import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: {},
            isLoading: false,
            error: false
        },
        signup: {}
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.login.isLoading = true
            state.login.currentUser = action.payload
            state.login.error = false
        },
        loginFail: (state) => {
            state.login.isLoading = false
            state.login.error = true
        }
    }
})

export const { loginSuccess, loginFail } = authSlice.actions

export default authSlice.reducer