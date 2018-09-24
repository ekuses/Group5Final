var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  app.listen(process.ev.PORT || config.port, function() {
    console.log('App listening on port', process.env.PORT || config.port);
  });
};