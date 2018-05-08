
var accountSid = 'AC0d0d9afc5ed35737181607fe6ac1d0fe';
var authToken = 'b1cd0433c0d4aede1824c0015d353e01';
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


module.exports = {
    notify: function (temp, callback) {
        var message = 'Alert Message from IotMonitor! Your heater temperature reaches your preferred limit. Temperature:'+temp+'*F';
        // console.log("Hello method in notifier",client);

        client.messages.create({
            body: message,
            to: '+16034041046',  // Text this number
            from: '+16072288676' // From a valid Twilio number
        }).then(function(message){
            console.log("Hello via code  message")
            console.log(message.sid)
        });
        // console.log("after client message");
        // controller.addNotification({message: message});
        callback({message:message});
    }
};

