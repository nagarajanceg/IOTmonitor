module.exports = function () {
    var Setting = require('../models/iotMonitor');
    var Notification = require('../models/iotNotification');
    var configure = function (details, callback) {
            console.log("in helper ctrl",details);
            // var ch =
        // console.log(Setting.count());
        Setting.count({name: 'Heater'}, function (err, c) {
           console.log(c);
           if(c === 0 ){
               var settingData = new Setting(details);
               settingData.save(function (err) {
                   if(err){
                       console.log("error at saving setting");
                       callback(err, false);
                       throw err;
                   }
                   callback(null, true);
               })
           }else{
               Setting.where({name:'Heater'})
                   .update({$set: {state: details.state, minTemp: details.minTemp, maxTemp:details.maxTemp}}, function (err) {
                       if(err){
                           callback(err, false);
                           throw err;
                       }
                       callback(null, true);
                   });
           }
        });
    };
    var configureNotifier = function (details) {
      var data = new Notification(details);
      console.log("in notification ctrl", details);
        data.save(function (err) {
           if(err){
               console.log("Error at saving Notifications");
                throw err;
           }
        });
    };
    var fetchNotifications = function (callback) {
        Notification.find({}, function (err, notifications) {
            if(err){
                console.log("error at fetching notifications");
                throw err;
            }
            callback(null, notifications);
        })
    };
    var update = function (data, callback) {
        Setting.where({name:'Heater'})
            .update({$set: {state: data.status}}, function (err) {
                if(err){
                    callback(err, false);
                    throw err;
                }
                callback(null, data.status);
            });
    };
    var getSetting = function (callback) {
        Setting.find({name: 'Heater'}, function (err, setting) {
            if(err){
                console.log("error at get setting");
                throw err;
            }
            callback(null, setting);
        });
    };
    return{
        configureSetting : configure,
        addNotification: configureNotifier,
        fetchNotifications: fetchNotifications,
        update: update,
        get: getSetting
    }
}