const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("not valid email")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    
    profile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    datecreated:Date,
    dateUpdated:Date
})

// model
const users = new mongoose.model("users",usersSchema);

module.exports = users;