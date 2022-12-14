import React, { useContext, useState } from 'react'
import { chatContext } from '../context/chatProvider';
import SideDrawer from '../components/extra/SideDrawer';
import { Box } from '@chakra-ui/layout';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';


function ChatPage() {
  const { user, setUser } = useContext(chatContext);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={ { width: '100%' } } >
      { user && <SideDrawer /> }
      <Box
        w='100%'
        display='flex'
        justifyContent='space-between'
        padding='15px'
        h='92vh'
      >
        { user && <MyChats fetchAgain={ fetchAgain } /> }
        { user && <ChatBox fetchAgain={ fetchAgain } setFetchAgain={ setFetchAgain } /> }
      </Box>
      chat
    </div>
  )
}

export default ChatPage
