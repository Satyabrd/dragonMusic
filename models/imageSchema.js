const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    background:{
        type: String,
        required: true
    },
    coverart: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('imageSchema', imageSchema);