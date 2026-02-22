const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

const cryoto = require('crypto');
const jwt = require('jsonwebtoken');

userSchema.methods.setPassword = function (password) {
    this.salt = cryoto.randomBytes(16).toString('hex');
    this.hash = cryoto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};  

userSchema.methods.validPassword = function (password) {
    const hash = cryoto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
    return jwt.sign(
    { // Payload for our JSON web token
            _id: this._id,
            email: this.email,
            name: this.name
    },
    process.env.JWT_SECRET, // Secret key for signing the token
    { expiresIn: '1h' }); // Token expiration time        
};

const User = mongoose.model('users', userSchema);

module.exports = User;