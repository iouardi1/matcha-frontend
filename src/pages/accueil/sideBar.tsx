import Image from 'next/image'
import profilePath from '/Users/macos/Desktop/matcha-backend/uploads/1725296132754.jpeg'
import defaultImage from '/Users/macos/Desktop/matcha-front/src/utils/pictures/woman1.jpeg'
import blurred from '@/utils/pictures/blurred.png'
import searchPath from '@/utils/pictures/icons8-search-final.png'
import premiumPath from '@/utils/pictures/icons8-premium-final.png'
import settingPath from '@/utils/pictures/icons8-setting-final.png'
import { useDispatch, useSelector } from 'react-redux'
import {
    getConversations,
    getListOfMatches, getProfile,
    initiateNewDM,
    setActiveConversation,
    setTab,
} from '@/redux/features/sideBarSlice'
import { useEffect } from 'react'
import { getImage } from '@/utils/helpers/functions'
// import { useSocket } from '@/redux/context/SocketContext'
import Loading from '@/components/ui/loading'
import { profileInit, profileSetup } from '@/redux/features/profileSetupSlice'
import { profileFetch } from '@/redux/features/profileSlice'
import { ChildProcess } from "child_process"

const SideBar = () => {

    const dispatch = useDispatch();
    const activeTab = useSelector((state: any) => state.sideBar.tab);
    const matches = useSelector((state: any) => state.sideBar.matches);
    const likes = useSelector((state: any) => state.sideBar.likes);
    const conversations = useSelector((state: any) => state.sideBar.conversations);
    const Profile = useSelector((state: any) => state.sideBar.profile);
    // const socket = useSocket();
    const loading = useSelector((state: any) => state.loading.loading);


    const fetchProfile = () => {
        dispatch(getProfile())
        dispatch(getListOfMatches())
        dispatch(getConversations());
    }

    useEffect(() => {
        // socket?.emit("hello", "world");
        fetchProfile();
        // return () => { socket?.disconnect() }
    }, [dispatch])

    const handleButtonClick = (tab: 'matches' | 'messages') => {
        dispatch(setTab(tab))
        dispatch(getConversations())
    }

    const handleConversationClick = (id: string) => {
        dispatch(setActiveConversation(id))
        dispatch(setTab('messages'))
    }

    const initiateDM = (match_id: string) => {
        const Conv =  conversations.find((c: any) => c.match_id == match_id)
        if (Conv) {
            dispatch(setActiveConversation(Conv.id));
        }
        else {
            const participants = { participant_id: match_id, user_id: Profile.id}
            dispatch(initiateNewDM(participants));
            
        }
        dispatch(setTab('messages'));
        dispatch(getConversations());
    };

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <div className="sidebar">
            <div className="header">
                <div className="profile-info">
                    <button>
                        <img
                            src={getImage(Profile?.profile_picture)}
                            alt=""
                            className="picture"
                        />
                    </button>
                    <span className="username">
                    {Profile?.username}
                    </span>
                </div>
                <div className="icons">
                    <button>
                        <Image
                            src={searchPath}
                            width={50}
                            height={50}
                            alt=""
                            className="icon1"
                        />
                    </button>
                    <button>
                        <Image
                            src={settingPath}
                            width={50}
                            height={50}
                            alt=""
                            className="icon2"
                        />
                    </button>
                    <button>
                        <Image
                            src={premiumPath}
                            width={50}
                            height={50}
                            alt=""
                            className="icon2"
                        />
                    </button>
                </div>
            </div>
            <div className="matches-messages">
                <button
                    className={activeTab === 'matches' ? 'active' : ''}
                    onClick={() => handleButtonClick('matches')}
                >
                    Matches
                </button>
                <button
                    className={activeTab === 'messages' ? 'active' : ''}
                    onClick={() => handleButtonClick('messages')}
                >
                    Messages
                </button>
            </div>
            <div className="content">
                {activeTab == 'matches' ? (
                    <div className="matches-content">
                        <div className="match">
                            <Image
                                src={blurred}
                                alt="User's profile"
                                className="match-number"
                            />
                            <p className="likes-count">{likes} likes</p>
                        </div>
                        {matches.length > 0 && matches?.map((match: any) => (
                            <button
                                key={match?.id}
                                className="match"
                                onClick={() => initiateDM(match?.id)}
                                >
                                <img
                                    src={getImage(match?.profile_picture)}
                                    alt=""
                                    className="match-picture"
                                />
                                <p className="match-name">{match?.username}</p>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="messages-content">
                        {conversations.map((conversation: any) => (
                            <button
                                key={conversation?.id}
                                className="conversation"
                                onClick={() =>
                                    handleConversationClick(conversation?.id)
                                }
                            >
                                <img
                                    src={getImage(conversation?.photo)}
                                    // width={65}
                                    // height={65}
                                    alt="Profile picture"
                                    className="conversation-picture"
                                />
                                <div className="conv-details">
                                    <p className="name">
                                        {conversation?.username}
                                    </p>
                                    <p className="last-message">
                                        {conversation?.last_message
                                            ? conversation?.last_message
                                            : '--- ---'}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideBar
