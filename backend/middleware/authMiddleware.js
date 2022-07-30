const jwt = require('jsonwebtoken');
const asyncHanlder = require('express-async-handler');
const User = require('../Models/User');

const checkAuth = asyncHanlder(async (req, res, next) => {
     
    let token;
   
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
          
             token = req.headers.authorization.split(' ')[1];
            const decodedToeken = jwt.verify(token, 'mahendrasuperduperkey');
            console.log(decodedToeken);
            req.user = await User.findById(decodedToeken.id).select('-password');
            next();
        } catch (err) {
            res.status(401);
            throw new Error("Not Authenticated");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authenticated");
    }
});

module.exports = {checkAuth}