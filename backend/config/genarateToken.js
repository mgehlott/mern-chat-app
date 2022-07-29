const jwt = require('jsonwebtoken');


const generateToken = (id) => {
    return jwt.sign({ id }, 'mahendrasuperduperkey', { expiresIn: "30d" });
}

module.exports = generateToken;