var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    state: {
      type: Boolean,
      required: true
    },
    minTemp : {
        type: Number,
        required: true
    },
    maxTemp : {
        type: Number,
        required: true
    },
    created_at: Date
});

settingSchema.pre('save', function (next) {
    this.created_at = new Date();
    next();
});

var settings = mongoose.model('settings', settingSchema );
module.exports = settings;
