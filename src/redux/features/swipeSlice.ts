import { axiosInstance } from '@/_axios/instance'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { startLoading, stopLoading } from './loadingSlice'

export interface swipeState {
    // error: any
    // data: []
}

const initialState: swipeState = {
    // loading: false,
    // error: null,
    // data: [],
}

export const swipeRight: any = createAsyncThunk(
    'swipe/right',
    async (arg, { dispatch }) => {
        const response = await axiosInstance.post('/filterMatches/swipeRight', arg)
        return response.data
    }
)

export const swipeLeft: any = createAsyncThunk(
    'swipe/left',
    async (arg, { dispatch }) => {
        const response = await axiosInstance.post('/filterMatches/swipeLeft', arg)
        return response.data
    }
)
export const blockUser: any = createAsyncThunk(
    'block',
    async (arg, { dispatch }) => {
        const response = await axiosInstance.post('/filterMatches/blockUser', arg)
        return response.data
    }
)

export const swipeSlice = createSlice({
    name: 'swipe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // .addCase(profileFetch.pending, (state) => {
        //     state.error = null
        // })
        // .addCase(profileFetch.fulfilled, (state, action) => {
        //     state.data = action.payload.data
        // })
        // .addCase(profileFetch.rejected, (state, action) => {
        //     state.error = action.error.message
        // })
    },
})

export const {} = swipeSlice.actions

export default swipeSlice.reducer
