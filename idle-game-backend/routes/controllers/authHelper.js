const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
    let genSalt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, genSalt);
    return hashedPassword;
}

async function createUser(user) {
    let newUser = await new User({
        username: user.username,
        password: user.password
    });
    return newUser;
}

async function errorHandler(error) {
    let errorMessage = null;
    if (error.errmsg.includes('username_1')) {
        errorMessage = 'Username Already Exist';
    }
    return errorMessage;
}

async function findOneUser(username) {
    try {
        let foundUser = await User.findOne({ username });
        if (!foundUser) {
            return 404;
        }
        return foundUser;
    } catch (error) {
        console.log(error)
        return error;
    }
}

async function createJwtToken(user) {

    let payload = {
        id: user._id,
        username: user.username
    }

    let jwtToken = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });
    return jwtToken;
}

async function comparePassword(incomingPassword, userPassword) {
    try {
        let comparedPassword = await bcrypt.compare(incomingPassword, userPassword);
        if (comparedPassword) {
            return comparedPassword
        } else {
            throw 409;
        }
    } catch (error) {
        return error;
    }
}

module.exports = {
    hashPassword,
    createUser,
    errorHandler,
    findOneUser,
    createJwtToken,
    comparePassword
}