const acyncHanlder = require('express-async-handler');
const Chat = require('../Models/Chat');
const Message = require('../Models/Message');
const User = require('../Models/User');


exports.sendMessage = acyncHanlder(async (req, res, next) => {

    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log('Invalid data passed to body');
        return res.sendStatus(400);
    }

    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    };

    try {

        var message = await Message.create(newMessage);
        message = await message.populate('sender', "name pic");
        message = await message.populate('chat');
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        });
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

exports.getAllMessage = acyncHanlder(async (req, res, next) => {

    try {
        const message = await Message.find({ chat: req.params.chatId })
            .populate('sender', "name pic email")
            .populate('chat');
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

