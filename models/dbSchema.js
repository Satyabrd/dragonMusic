const mongoose = require('mongoose');
//var images = require('imageSchema')

const UserSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    subtitle: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true 
    },
    uri: {
        type: String,
        required: true 
    },
    //images: [images.schema]
});

module.exports = User = mongoose.model('user', UserSchema);