import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
    activities: null,
    comments: null,
}

export const incidentSlice = createSlice({
    name: 'incident',
    initialState,
    reducers: {
        saveIncident: (state, action) => {
            state.data = action.payload
        },
        saveComments: (state, action) => {
            state.comments = action.payload
        },
        saveActivities: (state, action) => {
            state.activities = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { saveIncident, saveComments, saveActivities } = incidentSlice.actions

export default incidentSlice.reducer