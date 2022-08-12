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

app.listen(5000, () => {
    //  console.log(PORT);
    console.log(`sever is running at ${PORT}`);
});