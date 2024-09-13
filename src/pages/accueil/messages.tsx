import { useDispatch, useSelector } from "react-redux";
import Image from "next/image"
import closeIcon from "@/utils/pictures/close-icon.png"
import convSettings from "@/utils/pictures/conv-settings-icon.png"
import { useEffect, useRef, useState } from "react";
import { addNewMessages, fetchConversationMessages } from "@/redux/features/conversationSlice";
import { useSocket } from "@/redux/context/SocketContext";
import { getConversations, updateLastMessage } from "@/redux/features/sideBarSlice";
import { getImage } from "@/utils/helpers/functions";

const Messages = () => {
    const dispatch = useDispatch();
    const socket = useSocket();
    const convs = useSelector((state: any) => state.sideBar.conversations)
    const activeConversationId = useSelector((state: any) => state.sideBar.activeConversationId);
    const activeConversation = convs.find((conv: any) => conv.id === activeConversationId);
    
    const messages = useSelector((state: any) => state.conversation.activeConversationMessages);
    
    const Profile = useSelector((state: any) => state.sideBar.profile);
    
    const [newMessage, setNewMessage] = useState("");
    const conversationEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (activeConversationId) {
            dispatch(fetchConversationMessages(activeConversationId));

            socket?.emit('join conversation', activeConversationId);

            socket?.on('message received', (message: any) => {
                dispatch(addNewMessages(message));
                dispatch(updateLastMessage(message));
                // dispatch(getConversations(Profile.id)); a revoir
            });
        }

        // Clean up the socket events when the component unmounts or when activeConversationId changes
        return () => {
            socket?.emit('leave conversation', activeConversationId);
            socket?.off('message received');
        };
    }, [activeConversationId, dispatch, socket]);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    
    
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messageData = {
                participant_id: Profile.id,
                message_text: newMessage,
                conversationId: activeConversationId,
            };

            socket?.emit('new message', messageData);

            setNewMessage("");
        }
    };

     // Handle Enter key press in the input field
     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        activeConversationId && (
            <div className="conv">
                <div className="conv-era">
                    <div className="header">
                        <div className="userInfos">
                            <Image
                                src={getImage(activeConversation.photo)}
                                width={65}
                                height={65}
                                alt=""
                                className="userPicture"
                            />
                            <p> You matched with {activeConversation.username} on {activeConversation.matchingDate}</p>
                        </div>
                        <div className="conv-settings">
                        <Image
                            src={convSettings}
                            alt="Profile picture"
                            className="icon-picture"
                        />
                        <Image
                            src={closeIcon}
                            alt="Profile picture"
                            className="icon-picture"
                        />
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="conversation-history">
                    {messages?.map((message: any, index: number) => (
                            <div
                                key={index}
                                className={`message ${message.sender_id == Profile.id ? "user" : "match"}`}
                            >
                                <p>{message.message_text}</p>
                            </div>
                        ))}
                        {/* This element will always be scrolled into view */}
                        <div ref={conversationEndRef} />
                    </div>
                <div className="message-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyDown={handleKeyDown}
                    />
                    <button className="send-button" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
                <div className="profile">
                    <p>here</p>
                </div>
            </div>
        )
    )
}

export default Messages