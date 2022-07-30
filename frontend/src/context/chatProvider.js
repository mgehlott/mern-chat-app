import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
const chatContext = React.createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        setUser(userInfo);
        if (!userInfo) {
            navigate('/');
        }
    },[navigate]);

    return <chatContext.Provider value={{user,setUser}}>
        {children}
    </chatContext.Provider>
}

export default ChatProvider;