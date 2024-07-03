import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    tokens: null,
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserAndAuthData: (state, action) => {
            state.user = action.payload.user
            state.tokens = action.payload.tokens
            state.isAuthenticated = true
            localStorage.setItem("_u", JSON.stringify({ token: state.tokens.access.token, id: state.user.id }))
        },
        saveUserData: (state, action) => {
            state.user = action.payload
        },
        hydrateUserData: (state, action) => {
            state.user = action.payload.user
            state.tokens = action.payload.tokens
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.tokens = null
            state.isAuthenticated = false
            localStorage.removeItem("_u")
        }
    },
})

// Action creators are generated for each case reducer function
export const { hydrateUserData, saveUserAndAuthData, saveUserData, logout } = userSlice.actions

export default userSlice.reducer