var express = require('express');
var router = express.Router();
var notifier = require('./notify');
var constants = require('./constants');
var mongoose = require('mongoose');
var init = require('../app/initialize')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min+1))+min;
}
function procedure() {
    var temp = getRandomInt(constants.MIN, constants.MAX);
    console.log(temp);
    if(temp > constants.NOTIFIER_MIN && temp < constants.NOTIFIER_MAX){
        notifier.notify();
    }
}
router.get('/rand', function (req, res, next) {
    console.log("Enter method")
    setTimeout(procedure,1000);
});
module.exports = router;
