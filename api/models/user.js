const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    hash: String
});

userSchema.methods.setPassword = function (password) {
    this.hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.hash);
};

mongoose.model('user', userSchema);