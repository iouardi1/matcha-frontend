import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import match1 from "@/utils/pictures/woman1.jpeg"
import profilePath from "@/utils/pictures/person.jpg"
import { axiosInstance } from '@/_axios/instance';

interface Match {
    id: number;
    username: string;
    profile_picture: any;
}

interface Profile {
    id: number;
    username: string;
    profile_picture: any;
}

interface Conversation {
    id: number;
    conv_id: number;
    match_id: number;
    username: string;
    photo: string;
    last_message: string;
    matchingDate: string;
}

interface SideBarState {
    tab: 'matches' | 'messages';
    matches: Match[];
    likes: number;
    conversations: Conversation[];
    profile: Profile;
    activeConversationId: null,
    loading: boolean;
	error: any;
}

const initialState: SideBarState = {
    tab: 'matches',
    matches: [],
    likes: 30,
    conversations: [
    ],
    profile:  { id: 8, username: 'Oussama', profile_picture: profilePath },
    activeConversationId: null,
    loading: false,
	error: null,
};

export const initiateNewDM = createAsyncThunk(
    "initiateNewDM",
    async (participants, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`conversations/initiateNewDM`, participants);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.participants) {
                return rejectWithValue(error.response.data.participants)
            } else {
                return rejectWithValue(error.participants)
            }
        }
    }
);

export const getConversations = createAsyncThunk(
    "getConversations",
    async (user_id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`conversations/getAllConversations/${user_id}`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.user_id) {
                return rejectWithValue(error.response.data.user_id)
            } else {
                return rejectWithValue(error.user_id)
            }
        }
    }
);

export const getProfile = createAsyncThunk(
    "getProfileInfos",
    async (user_id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`profile/getProfileInfos`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.user_id) {
                return rejectWithValue(error.response.data.user_id)
            } else {
                return rejectWithValue(error.user_id)
            }
        }
    }
);

export const getListOfMatches = createAsyncThunk(
    "getListOfMatches",
    async (user_id, { rejectWithValue }) => {
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
);

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        setTab(state, action: PayloadAction<'matches' | 'messages'>) {
            state.tab = action.payload;
        },
        setActiveConversation(state, action) {
            state.activeConversationId = action.payload;
          },
          updateLastMessage: (state, action) => {
            const { conversationId, message_text } = action.payload;
            const conversation = state.conversations.find(
              (conv) => conv.id === conversationId
            );
            if (conversation) {
              conversation.last_message = message_text;
            }
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getConversations.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations = action.payload.data;
            })
            .addCase(getConversations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload.data;
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
                console.log('payload: ', action.payload.data);
                state.matches = action.payload.data;
            })
            .addCase(getListOfMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});


export const { setTab, setActiveConversation, updateLastMessage } = sideBarSlice.actions;
export default sideBarSlice.reducer;

