import Image from "next/image"
import profilePath from "@/utils/pictures/person.jpg"
import blurred from "@/utils/pictures/blurred.png"
import searchPath from "@/utils/pictures/icons8-search-final.png"
import premiumPath from "@/utils/pictures/icons8-premium-final.png"
import settingPath from "@/utils/pictures/icons8-setting-final.png"
import { useDispatch, useSelector } from "react-redux"
import {setActiveConversation, setTab} from "@/redux/features/sideBarSlice"

const SideBar = () => {

    const dispatch = useDispatch();
    const activeTab = useSelector((state: any) => state.sideBar.tab);
    const matches = useSelector((state: any) => state.sideBar.matches);
    const likes = useSelector((state: any) => state.sideBar.likes);
    const conversations = useSelector((state: any) => state.sideBar.conversations);
    const Profile = useSelector((state: any) => state.sideBar.profile);

    const handleButtonClick = (tab: 'matches' | 'messages') => {
        dispatch(setTab(tab));
    };

    const handleConversationClick = (id: string) => {
        dispatch(setActiveConversation(id));
    };

    return (
        <div className="sidebar">
            <div className="header">
                <div className="profile-info">
                    <button>
                        <Image
                            src={Profile.profilePicture}
                            alt=""
                            className="picture"
                        /> 
                    </button>
                    <span className="username">
                    {Profile.username}
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
                        {matches.map((match: any) => (
                            <button
                                key={match.id}
                                className="match"
                                onClick={() => handleConversationClick(match.id)}
                                >
                                <Image
                                    src={match.profilePicture}
                                    alt=""
                                    className="match-picture"
                                />
                                <p className="match-name">{match.name}</p>
                            </button>
                        ))}
                        </div>
                        ) : (
                            <div className="messages-content">
                            {conversations.map((conversation: any) => (
                                <button 
                                    key={conversation.id}
                                    className="conversation"
                                    onClick={() => handleConversationClick(conversation.id)}
                                >
                                    <Image
                                        src={conversation.userPicture}
                                        alt="Profile picture"
                                        className="conversation-picture"
                                    />
                                    <div className="conv-details">
                                        <p className="name">{conversation.name}</p>
                                        <p className="last-message">{conversation.lastMessage}</p>
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