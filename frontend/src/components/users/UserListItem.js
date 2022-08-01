import React from 'react'
import { Box, Avatar, Text } from '@chakra-ui/react';

function UserListItem({ handlerFunction, user }) {
    return (
        <Box
            onClick={ handlerFunction }
            cursor='pointer'
            bg='#E8E8E8'
            _hover={ {
                background: 'purple.500',
                color: 'white'
            } }
            width='100%'
            display='flex'
            alignItems='center'
            px={ 3 }
            py={ 2 }
            borderRadius='lg'
            m="10px 0"
        >
            <Avatar
                mr={ 2 }
                pointer='cursor'
                size='sm'
                name={ user.name }

            />
            <Box>
                <Text>{ user.name }</Text>
                <Text>
                    <b>Email : </b>
                    { user.email }
                </Text>
            </Box>


        </Box>
    )
}

export default UserListItem
