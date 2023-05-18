import { Avatar, Tooltip } from '@chakra-ui/react';
import React, { useContext } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/chatLogic';
import { chatContext } from '../../context/chatProvider'

const ScrollableChat = ({ messages }) => {

    const { user } = useContext(chatContext);
    const userData = JSON.parse(user);
    return (
        <ScrollableFeed>
            { messages && messages.map((m, i) => {

                return <div style={ { display: 'flex' } } key={ m._id } >
                    {
                        (isSameSender(messages, m, i) || isLastMessage(messages, i, userData._id)) &&
                        (

                            <Tooltip
                                label={ m.sender.name }
                                placement='bottom'
                                hasArrow
                            >
                                <Avatar
                                    mt='7px'
                                    mr={ 1 }
                                    size='sm'
                                    cursor='pointer'
                                    name={ m.sender.name }
                                    src={ m.sender.pic }
                                />
                            </Tooltip>
                        )

                    }
                    <span
                        style={ {
                            backgroundColor: `${m.sender._id === userData._id ? "#BEE3F8" : "#B9F5D0"
                                }`,
                            borderRadius: '20px',
                            padding: '5px 10px',
                            maxWidth: '75%',
                            marginLeft: isSameSenderMargin(messages, m, i, userData._id),
                            marginTop: isSameUser(messages, m, i, user._id) ? '3px' : '10px',
                        } }
                    >
                        { m.content }

                    </span>
                </div>
            }) }

        </ScrollableFeed>
    )
}

export default ScrollableChat
