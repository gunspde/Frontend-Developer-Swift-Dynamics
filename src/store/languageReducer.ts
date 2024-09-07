import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    language: 'EN',
}

const languageReducer = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload
        }
    }
})

export const { setLanguage } = languageReducer.actions
export default languageReducer.reducer
