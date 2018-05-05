var queryHelper = require("../helper/helper")();

module.exports = function () {

    var configure = function (req, res, next) {
        var min = req.body.min;
        var max = req.body.max;
        var state = req.body.status;
        var details = {state: state, minTemp: min, maxTemp:max};
        console.log("in Main ctrl");
        queryHelper.configureSetting(details, function (err, status) {
            if(status){
                res.send({status:true, message:"Success in update setting"});
            }else{
                res.send({status:false, message:"Failure in update setting"});
            }
        })
    };

    return{
        configure : configure
    };
}