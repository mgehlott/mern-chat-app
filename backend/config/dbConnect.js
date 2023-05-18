const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`database connected to host : ${result}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbConnect;