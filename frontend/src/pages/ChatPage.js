import React, { useContext } from 'react'
import { chatContext } from '../context/chatProvider';
import SideDrawer from '../components/extra/SideDrawer';
import { Box } from '@chakra-ui/layout';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';


function ChatPage() {
  const { user, setUser } = useContext(chatContext); 

  return (
    <div style={{ width:'100%' }} >
      { user && <SideDrawer /> }
      <Box
        w='100%'
        display='flex'
        justifyContent='space-between'
        padding='15px'
        h='92vh'
      >
        { user && <MyChats /> }
        {user && <ChatBox/>}
      </Box>
   </div>
  )
}

export default ChatPage
