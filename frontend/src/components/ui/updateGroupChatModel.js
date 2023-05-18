import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { AiFillEye } from 'react-icons/ai';
import { chatContext } from '../../context/chatProvider';
import UserBadge from '../users/UserBadge';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../users/UserListItem';

const UpdateGroupChatModel = ({ fechAgain, setFetchAgain, fetchMessagge }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, selectedChat, setSelectedChat } = useContext(chatContext);
    const [groupChatName, setGroupChatName] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const userData = JSON.parse(user);

    const handleAddUser = async (user1) => {

        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: 'User already exist in group',
                status: 'error',
                duration: '2000',
                isClosable: true,
                position: 'bottom'
            });
            return;
        }
        if (selectedChat.groupAdmin._id !== userData._id) {
            toast({
                title: 'User already exist in group',
                status: 'error',
                duration: '2000',
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            };
            const { data } = await axios.put('http://localhost:5000/api/chat/rename',
                {
                    chatId: selectedChat._id,
                    userId: user1._id
                },
                config
            );
            setSelectedChat(data);
            setFetchAgain(!fechAgain);
            setLoading(false);
        } catch (e) {
            toast({
                title: 'Error in Adding user to group !!',
                description: e.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
            setLoading(false);
        }
    }
    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== userData._id && userData._id !== user1._id) {
            toast({
                title: 'only admin can remove from group',
                status: 'error',
                duration: '2000',
                isClosable: true,
                position: 'bottom'
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            };
            const { data } = await axios.put('http://localhost:5000/api/chat/groupremove',
                {
                    chatId: selectedChat._id,
                    userId: user1._id
                },
                config
            );
            user1._id === userData._id ? selectedChat() : setSelectedChat(data);
            fetchMessagge();
            setFetchAgain(!fechAgain);
            setLoading(false);
        } catch (e) {
            toast({
                title: 'Error in removing user to group !!',
                description: e.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
            setLoading(false);
        }


    }
    const handleRename = async () => {
        // console.log(userData.token);
        if (!groupChatName) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            };
            const { data } = await axios.put('http://localhost:5000/api/chat/rename',
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName
                },
                config
            );
            setSelectedChat(data);
            setFetchAgain(!fechAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error in fetching chat !!',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
            setLoading(false);
        }
        setGroupChatName("");
    }
    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            toast({
                title: 'Plese Enter VAlid user',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            };
            const { data } = await axios.get(`http://localhost:5000/api/users/?search=${search}`,
                config);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: 'Search Result can not found !!',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
        }
    }

    return (
        <>
            <IconButton d={ { base: 'flex' } } icon={ <AiFillEye /> } onClick={ onOpen } />

            <Modal isOpen={ isOpen } onClose={ onClose } isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize='34px'
                        display='flex'
                        justifyContent='center'
                    >
                        { selectedChat.chatName }
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            display='flex'
                            flexWrap='wrap'
                            w='100%'
                            p={ 3 }
                        >
                            { selectedChat.users.map(u => <UserBadge
                                key={ u._id }
                                user={ u }
                                handleDelete={ () => handleRemove(u) }
                            />) }
                        </Box>
                        <FormControl display='flex' alignItems='center' >
                            <Input
                                placeholder='Chat Name'
                                m={ 3 }
                                value={ groupChatName }
                                onChange={ (e) => setGroupChatName(e.target.value) }
                            />
                            <Button
                                variant='solid'
                                colorScheme='teal'
                                ml={ 1 }
                                isLoading={ loading }
                                onClick={ handleRename }
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add User to Group'
                                mb={ 1 }
                                value={ search }
                                onChange={ (e) => handleSearch(e.target.value) }
                            />
                        </FormControl>
                        { loading ? (<Spinner />) :
                            (
                                searchResult.map(user => {

                                    return <UserListItem
                                        key={ user._id }
                                        handlerFunction={ () => handleAddUser(user) }
                                        user={ user }
                                    />
                                }
                                )
                            )
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={ 3 } onClick={ () => handleRemove(user) }>
                            Leave Group
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModel
