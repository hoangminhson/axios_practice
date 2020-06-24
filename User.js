const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

let userSchema = new Schema({
    _id:{
        type: String,
        default : shortid.generate
    },
    name:{
        type:String,
        required:true,
        unique:false
    },
    dob:{
        type: String,
        required: false,
        unique :false
    },
    age:{
        type: Number,
        required: false,
        unique :false
    }
},{
    versionKey :false
})

module.exports = mongoose.model('User', userSchema);