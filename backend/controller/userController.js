const asyncHanlder = require('express-async-handler');
const User = require('../Models/User');

exports.allUser = asyncHanlder(async (req, res, next) => {
    // console.log('sdljflds');
    const keyword = req.query.search ?
        {
            $or: [
              {name: {$regex:req.query.search,$options:"i"}},
              {email: {$regex:req.query.search,$options:"i"}}
          ]
        } : {};
   // console.log(keyword);
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.status(200).json(users);
});