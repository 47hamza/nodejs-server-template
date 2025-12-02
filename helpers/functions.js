const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {CONFIG} = require("../config/config");
const crypto = require('crypto');

// Encrypt Password
module.exports.encryptPassword = function (data) {
    return bcrypt.hashSync(data, 5);
}

// Compare encrypt password
module.exports.compareEncryptedPassword = function (orignalPassword, hashPassword) {
    return bcrypt.compareSync(orignalPassword, hashPassword)
}

// Generate JWT token
module.exports.generateJwtToken = function (data) {
    return jwt.sign({data: data}, CONFIG.JWT_EXPIRE, {expiresIn: CONFIG.JWT_EXPIRE})
}

module.exports.generateUserVerificationCode = function () {
    return crypto.randomBytes(22).toString("base64url").slice(0, 30);
}