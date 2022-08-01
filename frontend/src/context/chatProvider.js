import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const chatContext = React.createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    const chatChangeHandler = (chatss) => {

        setChats(chatss);

    }

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        setUser(userInfo);
        if (!userInfo) {
            navigate('/');
        }
    }, [navigate]);

    return <chatContext.Provider value={
        {
            user,
            setUser,
            selectedChat,
            setSelectedChat,
            chats,
            chatChangeHandler
        }
    }>
        { children }
    </chatContext.Provider>
}

export { ChatProvider, chatContext };