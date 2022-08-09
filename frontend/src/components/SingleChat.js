import React, { useContext } from 'react'
import { chatContext } from '../context/chatProvider'
import { Box, Text, IconButton } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { getSender, getSenderFull, getSenderName } from '../config/chatLogic';
import ProfileModal from './ui/ProfileModal';
import UpdateGroupChatModel from './ui/updateGroupChatModel';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = useContext(chatContext);

    return (
        <>
            { !selectedChat && <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                h='100%'
            >
                <Text
                    fontSize='3xl'
                    fontFamily='Work sans'
                    pb={ 3 }
                >
                    Click on a user to start chating...
                </Text>
            </Box> }
            { selectedChat &&
                <>

                    <Text
                        fontSize={ { base: '28px', md: '35px' } }
                        pb={ 3 }
                        px={ 2 }
                        width='100%'
                        display='flex'
                        justifyContent={ { base: 'space-between' } }
                        alignItems='center'
                    >
                        <IconButton
                            display={ { base: 'flex', md: 'none' } }
                            icon={ <AiOutlineArrowLeft /> }
                            onClick={ () => setSelectedChat('') }
                        />
                        { selectedChat.isGroupChat && <>
                            {
                                <>
                                    { selectedChat.chatName.toUpperCase() }
                                    <UpdateGroupChatModel fechAgain={ fetchAgain } setFetchAgain={ setFetchAgain } />
                                </>
                            }
                        </> }
                        { !selectedChat.isGroupChat && <>
                            { getSenderFull(user, selectedChat.users).name }
                            <ProfileModal user={ getSenderFull(user, selectedChat.users) } />
                        </> }
                    </Text>
                    <Box
                        display='flex'
                        flexDir='column'
                        justifyContent='flex-start'
                        p={ 3 }
                        bg="#E8E8E8"
                        w="100%"
                        h='100%'
                        borderRadius='lg'
                        overflowY='hidden'
                    >
                        kfjsdlfj
                    </Box>
                </>
            }
        </>
    )
}

export default SingleChat
