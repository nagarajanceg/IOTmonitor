var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    message:{
        type: String,
        required: true
    },
    // name:{
    //     type: String,
    //     required: true
    // },
    created_at: Date
});

notificationSchema.pre('save', function (next) {
    this.created_at = new Date();
    next();
});

var notification = mongoose.model('notification', notificationSchema);
module.exports = notification;