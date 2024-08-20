import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import match1 from "@/utils/pictures/woman1.jpeg"
import match2 from "@/utils/pictures/woman2.jpeg"
import match3 from "@/utils/pictures/woman3.jpeg"
import match4 from "@/utils/pictures/woman4.jpeg"
import profilePath from "@/utils/pictures/person.jpg"

interface Match {
    id: number;
    name: string;
    profilePicture: any;
}

interface Profile {
    id: number;
    username: string;
    profilePicture: any;
}

interface Conversation {
    id: number;
    name: string;
    userPicture: any;
    lastMessage: string;
    matchingDate: string;
}

interface SideBarState {
    tab: 'matches' | 'messages';
    matches: Match[];
    likes: number;
    conversations: Conversation[];
    profile: Profile;
    activeConversationId: null,
}

const initialState: SideBarState = {
    tab: 'matches',
    matches: [
        { id: 1, name: 'Match 1', profilePicture: match1 },
        { id: 2, name: 'Match 2', profilePicture: match4 },
        { id: 3, name: 'Match 3', profilePicture: match3 },
        { id: 4, name: 'Match 4', profilePicture: match2 },
        { id: 5, name: 'Match 5', profilePicture: match4 },
        { id: 6, name: 'Match 6', profilePicture: match1 },
        { id: 7, name: 'Match 7', profilePicture: match4 },
    ],
    likes: 30,
    conversations: [
        { id: 1, name: 'khaoula', userPicture: match1, lastMessage: 'Hey, how are you?', matchingDate: "15/10/2024" },
        { id: 2, name: 'meriem', userPicture: match2, lastMessage: 'I’m good, thanks!', matchingDate: "15/10/2024" },
        { id: 3, name: 'sarah', userPicture: match3, lastMessage: 'Let’s meet up soon!', matchingDate: "15/10/2024" },
        { id: 4, name: 'rim',userPicture: match4, lastMessage: 'Let’s meet up soon!', matchingDate: "15/10/2024" },
    ],
    profile:  { id: 6, username: 'Oussama', profilePicture: profilePath },
    activeConversationId: null,
};

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        setTab(state, action: PayloadAction<'matches' | 'messages'>) {
            state.tab = action.payload;
        },
        setConversations(state, action: PayloadAction<Conversation[]>) {
            state.conversations = action.payload;
        },
        setActiveConversation(state, action) {
            state.activeConversationId = action.payload;
          },
    },
});


export const { setTab, setConversations, setActiveConversation } = sideBarSlice.actions;
export default sideBarSlice.reducer;