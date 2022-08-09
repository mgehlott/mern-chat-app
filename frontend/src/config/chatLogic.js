export const getSender = (loggedUser, users) => {
    //console.log('logged in', loggedUser._id, loggedUser.name);
    //console.log(users);
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}
export const getSenderName = (loggedUser, users) => {
    //console.log('logged in', loggedUser._id, loggedUser.name);
    //  console.log(users);
    return users[0]._id === loggedUser._id ? users[0].name : users[1].name;
}

export const getSenderFull = (loggedUser, users) => {
    console.log('logged in', loggedUser._id, loggedUser.name);
    //console.log(users);
    console.log(users[0]._id === loggedUser._id);
    return users[0]._id === loggedUser._id ? users[1] : users[0];
}