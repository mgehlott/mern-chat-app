const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URI);
     //  console.log(`database connected to host : ${result.host}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbConnect;