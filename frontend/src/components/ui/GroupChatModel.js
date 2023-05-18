import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { chatContext } from '../../context/chatProvider';
import UserBadge from '../users/UserBadge';
import UserListItem from '../users/UserListItem';

const GroupChatModel = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ groupChatName, setGroupChatName ] = useState("");
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    const [ search, setSearch ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const toast = useToast();
    const { user, chats, chatChangeHandler } = useContext(chatContext);
    const userData = JSON.parse(user);
    const handleSearch = async (e) => {
        const query = e.target.value;
        console.log("debounce");
        setSearch(query);
        if (!query) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                },
            };
            const { data } = await axios.get(`http://localhost:5000/api/users/?search=${query}`,
                config
            );
            //  console.log('searched', data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error in fetching user !!',
                description: 'failed to fetch users',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
        }
    }
    const handleSubmit = async () => {

        if (!groupChatName || !selectedUsers) {
            toast({
                title: 'Please Fill all feilds',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
            return
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            };
            const { data } = await axios.post('http://localhost:5000/api/chat/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map(u => u._id))
            }, config);
            chatChangeHandler([ data, ...chats ]);
            onClose();
            toast({
                title: 'New Group Chat is Created',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });

        } catch (error) {
            toast({
                title: 'Failed to Create group',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
        }
    }
    const handlerFunction = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: 'User Already Exits in Group',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
            return;
        }
        setSelectedUsers(pre => {
            return [ ...pre, userToAdd ];
        })
    }
    const handleDelete = (userToDelete) => {
        setSelectedUsers(pre =>
            pre.filter(u => u._id !== userToDelete._id)
        )
    }

    return (
        <>
            <span onClick={ onOpen }>{ children }</span>

            <Modal isOpen={ isOpen } onClose={ onClose }>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        display='flex'
                        fontFamily='Work sans'
                        fontSize='35px'
                        justifyContent='center'
                    >Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexDir='column' alignItems='center' >
                        <FormControl id='groupname' isRequired >

                            <Input
                                placeholder='Enter Your Group Name'
                                mb={ 3 }
                                value={ groupChatName }
                                onChange={ (e) => setGroupChatName(e.target.value) }
                            />
                        </FormControl>
                        <FormControl id='users' isRequired >

                            <Input
                                placeholder='Search User Ex : Mahendra, Max, Virat'
                                mb={ 2 }

                                onChange={ handleSearch }
                            />
                        </FormControl>
                        <Box
                            w='100%'
                            display='flex'
                            flexWrap='wrap'
                        >

                            { selectedUsers.map(u => <UserBadge
                                key={ u.id }
                                user={ u }
                                handleDelete={ () => handleDelete(u) }
                            />) }
                        </Box>
                        { loading ? <div>Loading...</div> :
                            searchResult.slice(0, 4).map(user => {
                                return <UserListItem
                                    key={ user._id }
                                    user={ user }
                                    handlerFunction={ () => handlerFunction(user) }
                                />
                            })
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='purple' mr={ 3 } onClick={ handleSubmit }>
                            Create Chat
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModel
