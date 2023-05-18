const express = require('express');
const dotenv = require('dotenv');
const data = require('./data/data');
const authRouter = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const dbConnect = require('./config/dbConnect');
const chatRouter = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, mainErrorHandler } = require('./middleware/errorHandler');
const cors = require('cors');
const { Socket, Server } = require('socket.io');

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');
    next();
});
app.use(cors());
app.use(express.json());
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 5000;
dbConnect();


app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'home page' });
});
app.use('/api/auth', authRouter);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRoutes);
app.use(notFound);
app.use(mainErrorHandler);


// app.use('auth/user', authRouter);
const sever = app.listen(5000, () => {
    //  console.log(PORT);
    console
        .log(`sever is running at ${PORT}`);
});


const io = new Server(sever, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
    },
});


io.on("connection", (socket) => {
    console.log("connected socket io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user joined room ", room);
    });

    socket.on("new message", (newMessage) => {
        console.log('new message', newMessage);
        let chat = newMessage.chat;
        if (!chat.users)
            return console.log("user not define in chat");
        chat.users.forEach((user) => {
            if (user._id == newMessage.sender._id)
                return;
            socket.in(user._id).emit("message recieved", newMessage);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});

