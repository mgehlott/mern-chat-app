import React, { useContext } from 'react'
import { Box } from '@chakra-ui/react';
import { chatContext } from '../context/chatProvider';
import SingleChat from './SingleChat';

function ChatBox({ fetchAgain, setFetchAgain }) {

  const { selectedChat } = useContext(chatContext);

  return (
    <Box
      display={ { base: selectedChat ? 'flex' : 'none', md: 'flex' } }
      alignItems='center'
      flexDir='column'
      p={ 3 }
      bg='white'
      w={ { base: '100%', md: '63%' } }
      borderRadius='lg'
      borderWidth='1px'
    >

      <SingleChat fetchAgain={ fetchAgain } setFetchAgain={ setFetchAgain } />
    </Box>
  )
}

export default ChatBox
