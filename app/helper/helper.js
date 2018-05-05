module.exports = function () {
    var Setting = require('../models/iotMonitor');
    var configure = function (details, callback) {
            Setting.remove();
            var settingData = new Setting(details);
            console.log("in helper ctrl",details);

            settingData.save(function (err) {
                if(err){
                    console.log("error at saving setting");
                    callback(err, false);
                    throw err;
                }
                callback(null, true);
            })
    }
    return{
        configureSetting : configure
    }
}