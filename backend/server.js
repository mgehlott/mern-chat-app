const express = require('express');
const dotenv = require('dotenv');
const data = require('./data/data');

const app = express();
app.use(express.json());


dotenv.config({path:'./config.env'});
const PORT = process.env.PORT || 5000;
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');
//     next();
// });

app.get('/chat', (req, res, next) => {
    
    res.status(200).json({data:data})
});

app.get((req, res, next) => {
    res.status(404).json('eroor');
})

app.listen(5000, () => {
  //  console.log(PORT);
    console.log(`sever is running at ${PORT}`);
});