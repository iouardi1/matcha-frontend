import { axiosInstance } from '@/_axios/instance'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface profileState {
    loading: boolean
    error: any
    data: any
    updatedData: any
    disable: any
}

const initialState: profileState = {
    loading: false,
    error: null,
    data: null,
    updatedData: null,
    disable: true,
}

export const profileUpdate: any = createAsyncThunk(
    'profile/update',
    async (arg, { dispatch, getState }: any) => {
        const data = getState().profileUpdate.updatedData
        console.log(data)
        const response = await axiosInstance.put('/profile/updateProfile', data)
        // return response.data
    }
)

export const profileUpdateSlice = createSlice({
    name: 'profileUpdate',
    initialState,
    reducers: {
        ProfileUpdateData(state, action) {
            state.data = action.payload.data
        },
        UpdateSave(state, action) {
            state.disable = action.payload
        },
        FillUpdatedData(state, action) {
            state.updatedData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
    },
})

export const { ProfileUpdateData, UpdateSave, FillUpdatedData } =
    profileUpdateSlice.actions

export default profileUpdateSlice.reducer
