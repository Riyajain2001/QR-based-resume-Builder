const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userRegSchema = new Schema({

    name: {
        type: String,
        lowercase: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('user',userRegSchema);
