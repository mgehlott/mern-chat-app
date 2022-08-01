import React from 'react';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { AiFillEye } from 'react-icons/ai';
import { Text } from '@chakra-ui/react';

function ProfileModal({ user, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>{
            children ? (<span onClick={ onOpen } >{ children }</span>) :
                (
                    <IconButton
                        display={ { base: 'flex' } }
                        icon={ <AiFillEye /> }
                        onClick={ onOpen }
                    />
                )
        }

            <Modal size={ { base: 'xs', md: 'lg' } } isCentered isOpen={ isOpen } onClose={ onClose }>
                <ModalOverlay />
                <ModalContent h='410px' >
                    <ModalHeader
                        fontSize='40px'
                        d='flex'
                        color='white'
                        textTransform='capitalize'
                        bg='purple.800'
                        justifyContent='center'
                        textAlign='center'
                    >
                        { user.name }
                    </ModalHeader>
                    <ModalCloseButton color='white' />
                    <ModalBody
                        display='flex'
                        flexDir='column'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                            alt={ user.name }
                        />
                        <Text fontSize={ { base: '26px', md: '35px' } } >
                            { user.email }
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={ 3 } onClick={ onClose }>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal
