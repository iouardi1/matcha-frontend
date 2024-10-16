import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import profilePath from '@/utils/pictures/person.jpg'
import { axiosInstance } from '@/_axios/instance'
import { startLoading, stopLoading } from './loadingSlice'

interface Match {
    id: number;
    username: string;
    profile_picture: any;
}

interface PotentialMatch {
    id: number;
    username: string;
    age: string;
    location: string;
    distance: string;
    gender: string;
    profile_picture: any;
}

interface Profile {
    id: number
    username: string
    profile_picture: any
}

interface Conversation {
    id: number;
    conv_id: number;
    match_id: number;
    username: string;
    photo: string;
    last_message: string;
    matchingDate: string;
    interested_in_relation: string;
}

interface SideBarState {
    tab: 'matches' | 'messages';
    matches: Match[];
    potentialMatch: PotentialMatch[];
    likes: number;
    conversations: Conversation[];
    profile: Profile | null;
    activeConversationId: null,
    loading: boolean;
	error: any;
}

const initialState: SideBarState = {
    tab: 'matches',
    matches: [],
    potentialMatch: [],
    likes: 30,
    conversations: [],
    profile: null,
    activeConversationId: null,
    loading: false,
    error: null,
}

export const initiateNewDM = createAsyncThunk(
    'initiateNewDM',
    async (participants, { rejectWithValue, dispatch }) => {
        try {
            dispatch(startLoading())
            const response = await axiosInstance.post(
                `conversations/initiateNewDM`,
                participants
            )
            dispatch(stopLoading())
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.participants) {
                return rejectWithValue(error.response.data.participants)
            } else {
                return rejectWithValue(error.participants)
            }
        }
    }
)

export const getConversations = createAsyncThunk(
    "getConversations",
    async (user_id, { rejectWithValue }: any) => {
        try {
            const response = await axiosInstance.get(`conversations/getAllConversations`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const getTest: any = createAsyncThunk(
    'getProfileTest',
    async (arg, { dispatch }) => {
        dispatch(startLoading())
        const response = await axiosInstance.get(`/conversations`)
        if (!response.data.shouldRedirect) {
            dispatch(stopLoading())
        }
        return response.data
    }
)

export const getProfile = createAsyncThunk(
    'getProfileInfos',
    async (user_id, { rejectWithValue }: any) => {
        try {
            const response = await axiosInstance.get(`profile/getProfileInfos`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error)
            }
        }
    }
);

export const getListOfMatches = createAsyncThunk(
    "getListOfMatches",
    async (user_id, { rejectWithValue }: any) => {
        try {
            const response = await axiosInstance.get(`profile/getListOfMatches`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.user_id) {
                return rejectWithValue(error.response.data.user_id)
            } else {
                return rejectWithValue(error.user_id)
            }
        }
    }
)
export const getListOfPotentialMatches = createAsyncThunk(
    "getListOfPotentialMatches",
    async (user_id, { rejectWithValue }: any) => {
        try {
            const response = await axiosInstance.get(`filterMatches`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.user_id) {
                return rejectWithValue(error.response.data.user_id)
            } else {
                return rejectWithValue(error.user_id)
            }
        }
    }
)

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        setTab(state, action: PayloadAction<'matches' | 'messages'>) {
            state.tab = action.payload
        },
        setActiveConversation(state, action) {
            state.activeConversationId = action.payload
        },
        updateLastMessage: (state, action) => {
            const { conversationId, message_text } = action.payload
            const conversation = state.conversations.find(
                (conv) => conv.id === conversationId
            )
            if (conversation) {
                conversation.last_message = message_text
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversations.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getConversations.fulfilled, (state, action) => {
                state.loading = false
                state.conversations = action.payload.data
            })
            .addCase(getConversations.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload.data
                console.log('profile: ', state.profile);
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getListOfMatches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getListOfMatches.fulfilled, (state, action) => {
                state.loading = false;
                state.matches = action.payload.data;
            })
            
            .addCase(getListOfMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getListOfPotentialMatches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getListOfPotentialMatches.fulfilled, (state, action) => {
                state.loading = false;
                state.potentialMatch = action.payload.matches;
                console.log(' state.potentialMatch: ',  state.potentialMatch);
            })
            .addCase(getListOfPotentialMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(initiateNewDM.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initiateNewDM.fulfilled, (state, action) => {
                state.loading = false;
                state.activeConversationId = action.payload.data.id;
            })
            .addCase(initiateNewDM.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});


export const { setTab, setActiveConversation, updateLastMessage } =
    sideBarSlice.actions
export default sideBarSlice.reducer
