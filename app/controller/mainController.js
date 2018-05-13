var queryHelper = require("../helper/helper")();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var notifier = require("../../routes/notify");
var constants = require("../../routes/constants");
var timeNt ;
module.exports = function () {

    var configure = function (req, res, next) {
        var min = req.body.min;
        var max = req.body.max;
        var state = req.body.status;
        var name = req.body.name;
        var details = {name:name, state: state, minTemp: min, maxTemp:max};
        queryHelper.configureSetting(details, function (err, status) {
            if(status){
                res.send({status:true, message:"Success in update setting"});
            }else{
                res.send({status:false, message:"Failure in update setting"});
            }
        });
    };

    var addNotification = function (details) {
        queryHelper.addNotification(details);
    };
    var fetchNotifications = function (req, res, next) {
        queryHelper.fetchNotifications(function (err, notifications) {
            if(err){
                res.send({status: false, error: "problem in fetching notifications"});
            }else{
                res.send({status:true, notifications:notifications});
            }
        });
    };
    var sendResponse = function (message, res) {
        const twiml = new MessagingResponse();
        twiml.message(message);

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
    var incomingSMS = function (req,res, next) {
        var message ='';
        if(req.body.Body === "OFF"){
            message += 'Hello, your heater has been stopped. IOT Monitor';
            queryHelper.update({status:false}, function (err,status) {
                clearInterval(timeNt);
                sendResponse(message, res);
            });

        }else if(req.body.Body === "ON"){
            message += 'Hello, your heater has been started. IOT Monitor';
            queryHelper.update({status:true}, function (err,status) {
                sendResponse(message, res);
                timeNt = setInterval(procedure,5000);
            });
        }else{
            message += 'Hello, Provided option is invalid. Could you choose ON or OFF. IOT Monitor';
            sendResponse(message, res);
        }
    };
    var getSetting = function (req,res, next) {
        queryHelper.get(function (err, setting) {
            if(err){
                res.send({status: false, error: "problem in fetching Setting"});
            }else{
                res.send({status:true, setting:setting});
            }
        });
    };
    var myNotify = function (status) {
        if(status){
            timeNt = setInterval(procedure,5000);
        }else{
            clearInterval((timeNt));
        }
    }
    var startDevice = function (req,res, next) {
        queryHelper.update({status: req.body.status}, function (err, state) {
            if(err){
                res.send({status: false, error: "problem in update device status"});
            }else{
                myNotify(state);
                res.send({status:true, message:"Success in updating device status"});
            }
        });
    };
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min+1))+min;
    }
    function procedure() {
        var temp = getRandomInt(constants.MIN, constants.MAX);
        console.log(temp);
        if(temp < constants.NOTIFIER_MIN || temp > constants.NOTIFIER_MAX){
            console.log("notifier");
            notifier.notify(temp, addNotification);
        }
    }


    return{
        configure : configure,
        addNotification: addNotification,
        fetchNotifications: fetchNotifications,
        incomingSMS: incomingSMS,
        getSetting: getSetting,
        startDevice: startDevice
    };
}