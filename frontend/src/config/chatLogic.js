export const getSender = (loggedUser, users) => {
    console.log('logged in', loggedUser, users);
    console.log('user array ', users);
    return users[ 0 ]._id === loggedUser._id ? users[ 1 ].name : users[ 0 ].name;
}
export const getSenderName = (loggedUser, users) => {
    //console.log('logged in', loggedUser._id, loggedUser.name);
    //  console.log(users);
    return users[ 0 ]._id === loggedUser._id ? users[ 0 ].name : users[ 1 ].name;
}

export const getSenderFull = (loggedUser, users) => {
    //console.log('logged in', loggedUser._id, loggedUser.name);
    //console.log(users);
    //console.log(users[0]._id === loggedUser._id);
    return users[ 0 ]._id === loggedUser._id ? users[ 1 ] : users[ 0 ];
}

export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (
            messages[ i + 1 ].sender._id !== m.sender._id ||
            messages[ i + 1 ].sender._id === undefined) &&
        messages[ i ].sender_id !== userId
    );
}

export const isLastMessage = (messages, i, userId) => {

    return (
        i === messages.length - 1 &&
        messages[ messages.length - 1 ].sender._id !== userId &&
        messages[ messages.length - 1 ].sender._id
    );
}

export const isSameSenderMargin = (messages, m, i, userId) => {
    console.log(m.sender._id, userId);
    console.log(m.sender._id === userId, m.content);
    if (m.sender._id === userId)
        return '60%';
    else
        return '0px'
    // console.log(messages[i + 1].sender._id === m.sender._id);
    // if (
    //     i < messages.length - 1 &&
    //     (messages[i + 1].sender._id !== m._id ||
    //         messages[i].sender._id !== userId)
    // )
    //     return 33;
    // else if (
    //     (i < messages.length - 1 &&
    //         messages[i + 1].sender._id !== m.sender._id &&
    //         messages[i].sender._id !== userId) ||
    //     (i === messages.length - 1 && messages[i].sender._id !== userId)
    // )
    //     return 0;
    // else return "auto";
}


export const isSameUser = (messages, m, i) => {

    return i > 0 && messages[ i - 1 ].sender._id === m.sender._id;

}