import { createSlice } from '@reduxjs/toolkit'
import { haversineDistance } from '../utils'

const initialState = {
    places: [],
    types: [],
    weapons: [],
    latestActivity: [],
    crimes: [],
    notifications: []
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        savePlaces: (state, action) => {
            state.places = action.payload
        },
        saveTypes: (state, action) => {
            state.types = action.payload
        },
        saveWeapons: (state, action) => {
            state.weapons = action.payload
        },
        saveLatestActivity: (state, action) => {
            state.latestActivity = action.payload
        },
        saveCrimes: (state, action) => {
            state.crimes = action.payload
        },
        saveNotifications: (state, action) => {
            state.notifications = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { savePlaces, saveTypes, saveWeapons, saveLatestActivity, saveLatestActivityWithDistanceFromUser, saveCrimes, saveNotifications } = homeSlice.actions

export default homeSlice.reducer