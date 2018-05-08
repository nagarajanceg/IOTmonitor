var express = require('express');
var router = express.Router();

var constants = require('./constants');
var mongoose = require('mongoose');
var init = require('../app/initialize')();
var controller = require('../app/controller/mainController')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello',function (req, res, next) {
    console.log("hello");
    res.send({"res":"hello res"});
    // res.send("hello res");
});

router.get('/rand', function (req, res, next) {
    console.log("Enter method");
    // setTimeout(procedure,1000);
    res.send({"gen":"success"});
});


router.route('/setTemp').post(controller.configure);

router.route('/fetchNotifications').get(controller.fetchNotifications);

router.route('/sms').post(controller.incomingSMS);

router.route('/getSetting').get(controller.getSetting);

router.route('/startDevice').post(controller.startDevice);

module.exports = router;
