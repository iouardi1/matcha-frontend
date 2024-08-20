import { useDispatch, useSelector } from "react-redux";
import Image from "next/image"
import closeIcon from "@/utils/pictures/close-icon.png"
import convSettings from "@/utils/pictures/conv-settings-icon.png"
import { useEffect, useState } from "react";
import { fetchConversationMessages } from "@/redux/features/conversationSlice";

const Messages = () => {
    const dispatch = useDispatch();
    const convs = useSelector((state: any) => state.sideBar.conversations)
    const activeConversationId = useSelector((state: any) => state.sideBar.activeConversationId);
    const activeConversation = convs.find((conv: any) => conv.id === activeConversationId);

    const messages = useSelector((state: any) => state.conversation.activeConversationMessages);
   
    const Profile = useSelector((state: any) => state.sideBar.profile);
    
    useEffect(() => {
        if (activeConversationId) {
           dispatch(fetchConversationMessages(activeConversationId));
        }
    }, [activeConversationId, dispatch]);


    const [newMessage, setNewMessage] = useState("");
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // dispatch(sendMessage({ conversationId: activeConversationId, message: newMessage }));
            // setNewMessage(""); // Clear input after sending
        }
    };

    return (
        activeConversationId && (
            <div className="conv">
                <div className="conv-era">
                    <div className="header">
                        <div className="userInfos">
                            <Image
                                src={activeConversation.userPicture}
                                alt=""
                                className="userPicture"
                            />
                            <p> You matched with {activeConversation.name} on {activeConversation.matchingDate}</p>
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
                            <div key={index} className={`message ${message.sender_id === Profile.id ? 'user' : 'match'}`}>
                                <p>{message.message_text}</p>
                            </div>
                        ))}
                    </div>
                <div className="message-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
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