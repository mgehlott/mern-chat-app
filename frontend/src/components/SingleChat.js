import React, { useContext, useEffect, useState } from 'react'
import { chatContext } from '../context/chatProvider'
import { Box, Text, IconButton, Spinner, FormControl, Input, useToast } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { getSender, getSenderFull, getSenderName } from '../config/chatLogic';
import ProfileModal from './ui/ProfileModal';
import UpdateGroupChatModel from './ui/updateGroupChatModel';
import axios from 'axios';
import ScrollableChat from './ui/ScrollableChat';
import io from 'socket.io-client';

var ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = useContext(chatContext);
    const userData = JSON.parse(user);
    const [ messages, setMessages ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ newmessage, setNewMessage ] = useState("");
    const [ socketConnected, setSocketConnected ] = useState(false);
    const toast = useToast();

    const fetchMessagge = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            };
            setLoading(true);
            const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, config);
            console.log(messages);
            setMessages(data);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);

        } catch (error) {
            toast({
                title: 'Error Ocured!!',
                description: 'Failed to load message',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    const sendMessage = async (event) => {
        if (event.key === 'Enter' && newmessage) {
            try {
                console.log(userData.token);
                console.log(userData._id);
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${userData.token}`
                    }
                }


                const { data } = await axios.post(`http://localhost:5000/api/message`,
                    {
                        content: newmessage,
                        chatId: selectedChat._id
                    },
                    config
                );
                socket.emit("new message", data);
                setNewMessage("");
                console.log(data);
                setMessages([ ...messages, data ]);

            } catch (error) {
                toast({
                    title: 'Error Ocured!!',
                    description: 'Failed to send message',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'bottom'
                })
            }
        }
    }
    const typingHanlder = (e) => {
        setNewMessage(e.target.value);
    }
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", userData);
        socket.on('connected', () => setSocketConnected(true));
    }, [ userData ]);

    useEffect(() => {
        fetchMessagge();
        selectedChatCompare = selectedChat;
    }, [ selectedChat ]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRcv) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRcv.chat._id) {

            }
            else {
                setMessages([ ...messages, newMessageRcv ]);
            }
        });
    });

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
                                    <UpdateGroupChatModel
                                        fechAgain={ fetchAgain }
                                        setFetchAgain={ setFetchAgain }
                                        fetchMessagge={ fetchMessagge }
                                    />
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
                        justifyContent='space-between'
                        p={ 3 }
                        bg="#E8E8E8"
                        w="100%"
                        h='100%'
                        borderRadius='lg'
                        overflowY='hidden'
                    >
                        { loading ? (
                            <Spinner
                                w='20'
                                h='20'
                                alignSelf='center'
                                margin='auto'
                                size='xl'
                            />
                        ) : (
                            <Box
                                display='flex'
                                flexDir='column'
                                overflowY='scroll'

                            >
                                <ScrollableChat messages={ messages } />
                            </Box>
                        ) }
                        <FormControl
                            onKeyDown={ sendMessage }
                            isRequired
                            mt={ 3 }
                            bottom='10px'
                        >
                            <Input
                                variant='filled'
                                bg='#E0E0E0'
                                placeholder='Enter a Message...'
                                onChange={ typingHanlder }
                                value={ newmessage }
                            />
                        </FormControl>
                    </Box>
                </>
            }
        </>
    )
}

export default SingleChat
