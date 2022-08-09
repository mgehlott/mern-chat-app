import React, { useContext, useState } from 'react'
import { Box, Tooltip, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input, useToast } from '@chakra-ui/react';
import { BsSearch, BsChevronDown } from 'react-icons/bs';
import { AiFillBell } from 'react-icons/ai';
import { Avatar, Spinner } from '@chakra-ui/react';
import { chatContext } from '../../context/chatProvider';
import ProfileModal from '../ui/ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ui/ChatLoading';
import UserListItem from '../users/UserListItem';

function SideDrawer() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { user, setSelectedChat, chats, chatChangeHandler } = useContext(chatContext);
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const userData = JSON.parse(user);
    //console.log(userData);
    const logOutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    }
    const searchHandler = async () => {
        if (!search) {
            toast({
                title: 'Plese Enter Email or Name',
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

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            //   console.log('indise acceschat');
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                }
            }


            const { data } = await axios.post('http://localhost:5000/api/chat', { userId }, config);
            console.log('dadta is ', data);
            if (!chats.find(c => c._id === data._id)) {
                chatChangeHandler([data, ...chats]);
            }
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch (error) {
            toast({
                title: 'Error in fetching chat !!',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
        }
    }
    return (
        <>
            <Box
                display='flex'
                bg='white'
                p='5px 10px'
                w='100%'
                borderWidth='2px'
                justifyContent='space-between'
                alignItems='center'
            >
                <Tooltip label='Search User to Chat' hasArrow placement='bottom-end'>
                    <Button variant='ghost' onClick={ onOpen } >
                        <BsSearch />
                        <Text display={ { base: 'none', md: 'flex' } } px='4' >
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize='2xl' >
                    ChatBiz
                </Text>
                <div style={ { display: 'flex', alignItems: 'center' } }>
                    <Menu>
                        <MenuButton p={ 1 } fontSize='2xl' >
                            <AiFillBell />
                        </MenuButton>
                        {/* <MenuList></MenuList> */ }
                    </Menu>
                    <Menu>
                        <MenuButton as={ Button }
                            rightIcon={ <BsChevronDown /> }
                            marginLeft={ 3 }
                        >
                            <Avatar size='sm' name={ userData.name } />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={ userData }>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={ logOutHandler } >Log Out</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer
                isOpen={ isOpen }
                placement='left'
                onClose={ onClose }
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Search User</DrawerHeader>
                    <DrawerBody>
                        <Box
                            display='flex'
                            pb={ 2 }
                        >
                            <Input
                                placeholder='Search by name or email'
                                mr={ 2 }
                                value={ search }
                                onChange={ (e) => setSearch(e.target.value) }

                            />
                            <Button onClick={ searchHandler } >Go</Button>
                        </Box>
                        { loading ? (<ChatLoading />) :
                            (
                                searchResult.map(user => {

                                    return <UserListItem
                                        key={ user._id }
                                        handlerFunction={ () => accessChat(user._id) }
                                        user={ user }
                                    />
                                }
                                )
                            )
                        }
                        { loadingChat && <Spinner ml='auto' d='flex' /> }
                    </DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer
