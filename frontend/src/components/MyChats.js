import React, { useCallback, useContext, useEffect, useState } from 'react'
import { chatContext } from '../context/chatProvider';
import { useToast, Box, Button, Text, Spinner, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai'
import { getSender } from '../config/chatLogic';
import GroupChatModel from './ui/GroupChatModel';

function MyChats({ fetchAgain }) {

  const { selectedChat, setSelectedChat, chats, chatChangeHandler, user
  } = useContext(chatContext);
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const userData = JSON.parse(user);

  const fetchChats = useCallback(async () => {
    //  console.log('fecth');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      };
      const { data } = await axios.get('http://localhost:5000/api/chat', config);
      // console.log('data sisd :  ', data);
      chatChangeHandler(data);

    } catch (error) {
      toast({
        title: 'Error Occured !!',
        description: 'Failed to load the chats',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }, [chatChangeHandler,]);

  useEffect(() => {
    console.log('effffect');
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
    // console.log('chats', chats);
  }, [fetchAgain]);

  return (
    <Box
      display={ { base: selectedChat ? 'none' : 'flex', md: 'flex' } }
      flexDir='column'
      alignItems='center'
      p={ 3 }
      bg='white'
      w={ { base: '100%', md: '32%' } }
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        pb={ 3 }
        px={ 3 }
        fontSize={ { base: '28px', md: '30px' } }
        display='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
      >
        My Chats
        <GroupChatModel>
          <Button
            display='flex'
            fontSize={ { base: '17px', md: '10px', lg: '20px' } }
            rightIcon={ <AiOutlinePlus /> }
          >
            New Group Chat
          </Button>
        </GroupChatModel>

      </Box>
      <Box
        display='flex'
        flexDir='column'
        p={ 3 }
        bg='#F8F8F8'
        w='100%'
        h='100%'
        borderRadius='lg'
        overflowY='hidden'
      >
        { chats.length > 0 ?
          (
            <Stack>
              { chats.map((chat) => {

                return <Box
                  onClick={ () => setSelectedChat(chat) }
                  cursor='pointer'
                  bg={ selectedChat === chat ? "purple.300" : '#e8e8e8' }
                  color={ selectedChat === chat ? 'white' : 'black' }
                  px={ 3 }
                  py={ 2 }
                  borderRadius='lg'
                  key={ chat._id }
                >
                  <Text>
                    { !chat.isGroupChat ?
                      getSender(loggedUser, chat.users) :
                      chat.chatName
                    }
                  </Text>
                </Box>
              }) }
            </Stack>
          ) :
          (<Spinner size='md' />) }
      </Box>
    </Box>
  )
}

export default MyChats;
