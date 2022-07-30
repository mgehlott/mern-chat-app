const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler');
const Chat = require('../Models/Chat');
const User = require('../Models/User');

exports.accessChat = asyncHandler( async (req, res, next) => {

    const {userId } = req.body;
    if (!userId) {
        console.log('user id is not sent with request');
        return res.sendStatus(400);
    }
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate('users', '-password')
        .populate('latestMessage');
    
    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email'
    });
     
    if (isChat.length > 0) {
        res.status(200).json(isChat);
    }
    else {
        const chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId]
        };
        
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id })
                .populate('users', '-password');
            res.status(200).json(createdChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }


});
 


exports.getChats = asyncHandler( async (req, res, next) => {

      try {
        
          let chat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
              .populate('users', '-password')
              .populate('groupAdmin', '-password')
              .populate('latestMessage').
              sort({ updatedAt: -1 });
          chat = await User.populate(chat, {
              path: 'latestMessage.sender',
              select: 'name email pic'
          });
          res.status(200).json(chat);
          
      } catch (error) {
          res.status(400);
          throw new Error(error.message);
      }
});
 
exports.createGroupChat = asyncHandler(async (req, res, next) => {
    
    if (!req.body.users || !req.body.name) {
       return  res.status(400).json("Please fill all field");
    }
  
    var users = JSON.parse(req.body.users);
    
    if (users.length < 2) {
        return res.status(400).json("Please Select more than 2 user");
    }
   // console.log("userss", users.charAt(4));
    console.log("users" , users);
    users.push(req.user);
    
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin:req.user
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate('groupAdmin', '-password');
        res.status(200).json(fullGroupChat);


    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }


} );

exports.renameGroup = asyncHandler(async (req, res, next) => {
   
    const { chatId, chatName } = req.body;
    const updateChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        }, {
        new: true
    }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");
    
    if (!updateChat) {
        res.status(404);
        throw new Error("Chat not found");
    } else {
        res.status(200).json(updateChat);
    }

    
});

exports.groupadd = asyncHandler(async (req, res, next) => { 
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(chatId,
        {
            $push:{users:userId}
        },
        {
            new:true
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");
    
    if (!added) {
        res.status(404);
        throw new Error("chat not found");
    } else {
        res.status(200).json(added);
    }
});

exports.removeFromGroup = asyncHandler(async (req, res, next) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(chatId,
        {
            $pull:{users:userId}
        },
        {
            new:true
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");
    
    if (!removed) {
        res.status(404);
        throw new Error("chat not found");
    } else {
        res.status(200).json(removed);
    }
});