var mongoose = require('mongoose');
var config = require('./config');
var connectDb = function () {
    mongoose.connect(config.db.url,function (err) {
        if(err){
            console.log("error in db Connection");
        }else{
            console.log("connection Successful");
        }
    });
}
module.exports = connectDb;