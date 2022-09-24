const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resumeSchema = new Schema({

    username: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    objective: {
        type: String
    },
    name: {
        type: String
    },
    universityname : {
        type: String
    },
    major: {
        type: String
    },
    minor: {
        type: String
    },
    officeskills: {
        type: String
    },
    computerskils: {
        type: String
    },
    experience1: {
        type: String
    },
    experience2: {
        type: String
    },
    hobbies: {
        type: String
    },
    date:{
        type: Date
    }

})

module.exports = mongoose.model('resumes',resumeSchema);
