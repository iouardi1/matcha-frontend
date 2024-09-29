import { axiosInstance } from '@/_axios/instance'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { startLoading, stopLoading } from './loadingSlice'

export interface profileState {
    // loading: boolean
    error: any
    data: []
}

const initialState: profileState = {
    // loading: false,
    error: null,
    data: [],
}

export const profileFetch: any = createAsyncThunk(
    'profile/fetch',
    async (arg, { dispatch }) => {
            dispatch(startLoading())
            const response = await axiosInstance.get('/profile')
            // console.log(response.data.shouldRedirect);
            if (!response.data.shouldRedirect) {
              dispatch(stopLoading())
            }
            return response.data
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(profileFetch.pending, (state) => {
                // state.loading = true
                state.error = null
            })
            .addCase(profileFetch.fulfilled, (state, action) => {
                // state.loading = false
                state.data = action.payload.data
            })
            .addCase(profileFetch.rejected, (state, action) => {
                // state.loading = false
                state.error = action.error.message
            })
    },
})

export const {} = profileSlice.actions

export default profileSlice.reducer
