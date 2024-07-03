import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/userSlice.js'
import homeReducer from './redux/homeSlice.js'
import incidentReducer from './redux/incidentSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        home: homeReducer,
        incident:incidentReducer
    },
})