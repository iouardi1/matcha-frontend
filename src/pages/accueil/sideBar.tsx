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
    getListOfMatches,
    getListOfPotentialMatches,
    getProfile,
    initiateNewDM,
    setActiveConversation,
    setTab,
} from '@/redux/features/sideBarSlice'
import { useEffect, useState } from 'react'
import { getImage } from '@/utils/helpers/functions'
// import { useSocket } from '@/redux/context/SocketContext'
import Loading from '@/components/ui/loading'
import { profileInit, profileSetup } from '@/redux/features/profileSetupSlice'
import { profileFetch } from '@/redux/features/profileSlice'
import { useSocket } from '@/redux/context/SocketContext'

const SideBar = () => {
    const dispatch = useDispatch()
    const activeTab = useSelector((state: any) => state.sideBar.tab)
    const matches = useSelector((state: any) => state.sideBar.matches)
    const likes = useSelector((state: any) => state.sideBar.likes)
    const conversations = useSelector(
        (state: any) => state.sideBar.conversations
    )
    const Profile = useSelector((state: any) => state.sideBar.profile)
    const notifSocket = useSocket();
    const loading = useSelector((state: any) => state.loading.loading)

    const fetchProfile = () => {
        dispatch(getProfile())
        dispatch(getListOfMatches())
        dispatch(getListOfPotentialMatches())
        dispatch(getConversations())
    }

    const [notif, setNotif] = useState(false)
    const [show, setShow] = useState(false)
    const handleNotif = () => {
        setShow(!show)
        if (notif) setNotif(false)
    }

    useEffect(() => {
        fetchProfile()
    }, [dispatch])

    // useEffect notif 
    useEffect(() =>{
        notifSocket?.on("notif received", () => {
            console.log('notif');
        })

        return () => {
            notifSocket?.off('notif received');
        };
    },[notif])


    const handleButtonClick = (tab: 'matches' | 'messages') => {
        dispatch(setTab(tab))
        dispatch(getConversations())
    }

    const handleConversationClick = (id: string) => {
        dispatch(setActiveConversation(id))
        dispatch(setTab('messages'))
    }

    const initiateDM = (match_id: string) => {
        const Conv = conversations.find((c: any) => c.match_id == match_id)
        if (Conv) {
            dispatch(setActiveConversation(Conv.id));
        }
        else {
            const participants = { participant_id: match_id, user_id: Profile.id}
            dispatch(initiateNewDM(participants));
            
        }
        dispatch(setTab('messages'))
        dispatch(getConversations())
    }

    if (loading) {
        return <Loading />
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
                    <span className="username">{Profile?.username}</span>
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
                    {/* notif */}
                    <button
                        className="relative"
                        onClick={() => {
                            handleNotif()
                        }}
                    >
                        <div
                            className={` ${notif ? "" : "hidden"} w-[10px] h-[10px] bg-green-500 rounded-[20px] absolute left-9 -top-1`}
                        ></div>
                        <div
                            className={`${
                                show ? '' : 'hidden'
                            } flex flex-col items-center bg-white w-[400px] h-[200px] absolute top-6 left-7 rounded-xl`}
                        >
                            <div className="h-full w-full">
                                {/* {notifArr.map((notif: NotifData, key) => {
                                    if (notif.type === 'game') {
                                        return (
                                            <NotifItem
                                                key={key}
                                                notif={notif}
                                                socket={props.socket}
                                            />
                                        )
                                    }
                                })} */}
                            </div>
                        </div>
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

{
    /* <div onClick={handleNotif} className="flex items-center justify-center bg-[#FEFEFF] relative  md:h-[50px] md:w-[50px] h-[40px] w-[40px] rounded-[10px] md:rounded-[15px] md-rounded-[20px]">
    <div className={`${notif ? "" : "hidden"} w-[10px] h-[10px] bg-red-500 rounded-[20px] absolute top-[-5px] left-[25px] sm:left-[30px] md:left-[40px]`}></div>
        <div className={`${show ? "" : "hidden"} flex flex-col items-center bg-white  absolute left-[-360px] top-[41px] w-[400px] h-[200px] md:top-[51px] md:left-[-355px] md:w-[400px]`}>
        <div className="h-full w-full overflow-y-scroll">
            {notifArr.map((notif:NotifData, key) => {
                if(notif.type === "game")
                {
                    return (
                        <NotifItem key={key} notif={notif} socket={props.socket}/>
                        )
                }
                else
                {
                    return (
                        <FriendNotifItem key={key} notif={notif} socket={props.socket} />
                    )
                }
            })}
        </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="25" viewBox="0 0 21 25" fill="none">
        <path d="M7.91885 21.1081C8.53136 20.9785 12.2636 20.9785 12.8761 21.1081C13.3997 21.229 13.966 21.5116 13.966 22.1286C13.9355 22.716 13.5909 23.2367 13.1148 23.5674C12.4974 24.0487 11.7729 24.3535 11.0155 24.4633C10.5966 24.5176 10.185 24.5188 9.78072 24.4633C9.02209 24.3535 8.29756 24.0487 7.6814 23.5662C7.20406 23.2367 6.85945 22.716 6.82901 22.1286C6.82901 21.5116 7.39524 21.229 7.91885 21.1081ZM10.4698 0C13.0185 0 15.6219 1.20932 17.1684 3.21581C18.1718 4.5078 18.6321 5.79857 18.6321 7.80505V8.32703C18.6321 9.86583 19.0388 10.7728 19.9338 11.818C20.6121 12.588 20.8288 13.5765 20.8288 14.6488C20.8288 15.7199 20.4769 16.7367 19.7719 17.5623C18.8488 18.552 17.5471 19.1838 16.2186 19.2936C14.2934 19.4577 12.367 19.5959 10.415 19.5959C8.46183 19.5959 6.53664 19.5132 4.61145 19.2936C3.28171 19.1838 1.97999 18.552 1.05818 17.5623C0.353134 16.7367 0 15.7199 0 14.6488C0 13.5765 0.217969 12.588 0.895013 11.818C1.81803 10.7728 2.19796 9.86583 2.19796 8.32703V7.80505C2.19796 5.74427 2.71183 4.39674 3.77001 3.0776C5.34329 1.15379 7.86515 0 10.3602 0H10.4698Z" fill="#8F8F8F" />
    </svg>
</div> */
}

// notifitem

//<div className="bg-slate-50 items-center justify-around w-full h-[50px] flex flex-row border-b-solid border-b-[1px] mt-[3px] border-b-white">
//     <img src={senderData.image} className="w-[40px] h-[80%] rounded-[20px]" />
//     <div className="w-[40%] text-center text-[15px]">{senderData.username} has invited you to a game</div>
//     <div className="flex justify-around w-[40%] h-full items-center">
//       <Link className="h-[55%] w-fit" to="/pvf" onClick={accept}>
//       <svg className='h-full' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z" fill="#6F37CF"></path> </g></svg>
//       </Link>
//       <button onClick={decline} className=" h-[55%] w-fit">
//       <svg className='h-full' viewBox="0 0 24 24" fill="#EB5E5E" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z" fill="#EB5E5E"></path> </g></svg>
//       </button>
//     </div>
// </div>
