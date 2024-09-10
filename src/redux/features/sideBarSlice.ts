import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import match1 from "@/utils/pictures/woman1.jpeg"
import match2 from "@/utils/pictures/woman2.jpeg"
import match3 from "@/utils/pictures/woman3.jpeg"
import match4 from "@/utils/pictures/woman4.jpeg"
import profilePath from "@/utils/pictures/person.jpg"
import { axiosInstance } from '@/_axios/instance';

interface Match {
    id: number;
    name: string;
    profile_picture: any;
}

interface Profile {
    id: number;
    username: string;
    profilePicture: any;
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
    matches: [
        { id: 9, name: 'Match 1', profilePicture: match1 },
        // { id: 2, name: 'Match 2', profilePicture: match2 },
        // { id: 3, name: 'Match 3', profilePicture: match3 },
        // { id: 4, name: 'Match 4', profilePicture: match4 },
        // { id: 5, name: 'Match 5', profilePicture: match4 },
        // { id: 6, name: 'Match 6', profilePicture: match1 },
        // { id: 7, name: 'Match 7', profilePicture: match4 },
    ],
    likes: 30,
    conversations: [
    ],
    profile:  { id: 8, username: 'Oussama', profilePicture: profilePath },
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
    },
});


export const { setTab, setActiveConversation, updateLastMessage } = sideBarSlice.actions;
export default sideBarSlice.reducer;