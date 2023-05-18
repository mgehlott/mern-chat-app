import { Box } from '@chakra-ui/react';
import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';

const UserBadge = ({ user, handleDelete }) => {
    return (
        <Box
            px={ 2 }
            key={ user.id }
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            py={ 1 }
            borderRadius='lg'
            m={ 1 }
            mb={ 2 }
            variant='solid'
            fontSize='14px'
            cursor='pointer'
            bg='purple'
            color='white'
            onClick={ handleDelete }
        >
            <span style={ { marginRight: '7px' } } >{ user.name }</span>
            <AiFillCloseCircle />
        </Box>
    )
}

export default UserBadge;
