const asyncHanlder = require('express-async-handler');
const User = require('../Models/User');
//const { use } = require('../routes/authRoutes');
const generateToken = require('../config/genarateToken');

exports.createUser = asyncHanlder(async (req, res, next) => {

    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all Infomation");
    }

    const userExits = await User.findOne({ email });
    if (userExits) {
        res.status(400);
        throw new Error("User is Already Exits with email");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user) {
        res.status(201).json({
            message: 'User create',
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('User  created failed');
    }
}
);


exports.login = asyncHanlder(async (req, res, next) => {
    //    console.log(req);
    //   console.log(req.get('Authorization'));
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("please enter all details");
    }

    const user = await User.findOne({ email });

    console.log(user);
    const isPassSame = await user.matchPassword(password);
    console.log('is Same', isPassSame);
    if (user && isPassSame) {
        res.status(200).json({
            message: 'Logged in',
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(402);
        throw new Error("please enter valid email or password");
    }
}
);